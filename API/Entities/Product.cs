namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public int StockQuantity { get; set; }
        public string Category { get; set; }
        //Can do dotnet ef migrations add TitleName
        public string PublicId { get; set; }
    }
}