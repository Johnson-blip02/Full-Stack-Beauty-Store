using System.ComponentModel.DataAnnotations;


namespace API.DataTransferObject
{
    public class CreationProductDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public long Price { get; set; }

        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public int StockQuantity { get; set; }

        [Required]
        public string Category { get; set; }
    }
}