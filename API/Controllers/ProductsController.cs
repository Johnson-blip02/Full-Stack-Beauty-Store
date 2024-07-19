using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BasicApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Category)
                .AsQueryable();

            var products = await PageList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters(){
            var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var category = await _context.Products.Select(p => p.Category).Distinct().ToListAsync();
            return Ok(new {brands, category});
        }
    }
}
