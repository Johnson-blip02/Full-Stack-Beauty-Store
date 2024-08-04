using System;
using System.Threading.Tasks;
using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BasicApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await RetrieveCart(GetBuyerId());

            if (cart == null) return NotFound();

            return Ok(cart.MapBasketToDto());
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            var cart = await RetrieveCart(GetBuyerId()) ?? CreateCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

            cart.AddItem(product, quantity);

            var results = await _context.SaveChangesAsync() > 0;
            if (results) return CreatedAtRoute("GetCart", cart.MapBasketToDto());
            
            return BadRequest(new ProblemDetails { Title = "Problem saving product to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await RetrieveCart(GetBuyerId());
            if (cart == null) return NotFound();

            cart.RemoveItem(productId, quantity);
            var results = await _context.SaveChangesAsync() > 0;

            if (results) return NoContent();

            return BadRequest(new ProblemDetails { Title = "Failed to remove item from cart" });
        }

        private Cart CreateCart()
        {
            var buyerId = User.Identity?.Name ?? Guid.NewGuid().ToString();
            
            if (User.Identity?.Name == null)
            {
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var cart = new Cart { BuyerId = buyerId };
            _context.Carts.Add(cart);
            return cart;
        }

        private async Task<Cart> RetrieveCart(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Carts
                .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
    }
}
