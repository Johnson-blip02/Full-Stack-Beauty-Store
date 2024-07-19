namespace API.Entities
{
    public class Cart
    {
        public int Id {get; set;}
        public string BuyerId {get; set;}
        public List<CartItem> Items {get; set;} = new();

        public void AddItem(Product product, int quantity){
            if(Items.All(item => item.ProductId != product.Id)){
                Items.Add(new CartItem{Product = product, Quantity = quantity});
            }
            var existItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existItem != null) existItem.Quantity += quantity;
        }
        public void RemoveItem(int productId, int quantity){
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if(item.Quantity == 0) Items.Remove(item);
        }
    }
}