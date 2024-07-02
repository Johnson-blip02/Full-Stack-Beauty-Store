using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
    private readonly StoreData _data;
        public ProductsController(StoreData data)
        {
            _data = data;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            return await _data.Products.ToListAsync();
        }

        [HttpGet("{id}")] //api/products/3 return the id
        public async Task<ActionResult<Product>> GetProduct(int id){
            return await _data.Products.FindAsync(id);
        }
    }
}