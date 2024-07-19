namespace API.DataTransferObject
{
    public class CartDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<CartItemDto> Items {get; set;}
    }

}