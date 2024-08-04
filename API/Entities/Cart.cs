using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<CartItem> Items { get; set; } = [];

        public void AddItem(Product product, int quantity)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero", nameof(quantity));

            var existingItem = Items.SingleOrDefault(item => item.ProductId == product.Id);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                Items.Add(new CartItem { Product = product, Quantity = quantity });
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero", nameof(quantity));

            var item = Items.SingleOrDefault(i => i.ProductId == productId);

            if (item != null)
            {
                item.Quantity -= quantity;
                if (item.Quantity <= 0)
                {
                    Items.Remove(item);
                }
            }
        }
    }
}
