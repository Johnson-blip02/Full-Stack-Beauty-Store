namespace API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureURL { get; set; }
        public string Brand { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; }
    }
}