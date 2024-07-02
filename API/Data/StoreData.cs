using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreData : DbContext
    {
        public StoreData(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
    }
}