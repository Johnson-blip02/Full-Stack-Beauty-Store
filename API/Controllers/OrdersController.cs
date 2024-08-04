using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DataTransferObject;
using API.Entities.Order;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BasicApiController
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            var orders = await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(o => o.BuyerId == User.Identity.Name)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(o => o.BuyerId == User.Identity.Name && o.Id == id)
                .FirstOrDefaultAsync();

            if (order == null)
                return NotFound(new ProblemDetails { Title = "Order Not Found" });

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(NewOrderDto orderDto)
        {
            var cart = await _context.Carts
                .RetrieveCartWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (cart == null)
                return BadRequest(new ProblemDetails { Title = "Unable to locate Cart" });

            var items = new List<OrderItem>();
            foreach (var item in cart.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                if (productItem == null)
                    return BadRequest(new ProblemDetails { Title = "Product Not Found" });

                if (productItem.StockQuantity < item.Quantity)
                    return BadRequest(new ProblemDetails { Title = $"Insufficient stock for {productItem.Name}" });

                var itemOrdered = new ItemOrder
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };

                items.Add(orderItem);
                productItem.StockQuantity -= item.Quantity;
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 50 ? 0 : 10;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(u => u.Address)
                    .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

                if (user == null)
                    return BadRequest(new ProblemDetails { Title = "User Not Found" });

                var address = new CustomerAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    State = orderDto.ShippingAddress.State,
                    Zip = orderDto.ShippingAddress.Zip,
                    Country = orderDto.ShippingAddress.Country,
                };

                user.Address = address;
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Problem creating order" });
        }
    }
}
