using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataTransferObject;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDTO MapBasketToDto(this Cart cart){
            
            return new CartDTO
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                    Category = item.Product.Category,
                }).ToList()
            };
        }

        public static IQueryable<Cart> RetrieveCartWithItems(this IQueryable<Cart> query, string buyerId){
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(b => b.BuyerId == buyerId);
        }
    }
}