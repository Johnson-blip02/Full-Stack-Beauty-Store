using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DataTransferObject;
using AutoMapper;
using API.ServicesToken;

namespace API.Controllers
{
    public class ProductsController : BasicApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
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

        [HttpGet("{id}", Name="GetProduct")]
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

//Could prob take out roles for any tbh
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreationProductDto productDto){
            var product = _mapper.Map<Product>(productDto);
            if(productDto.File != null){
                var imageResult = await _imageService.AddImageAsync(productDto.File);
                if(imageResult.Error != null) return BadRequest(new ProblemDetails {Title = "Error for new product"});

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }
            _context.Products.Add(product);
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);
            return BadRequest(new ProblemDetails {Title = "Error for new product"});
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> EditProduct([FromForm]EditProductDto productDto){
            var product = await _context.Products.FindAsync(productDto.Id);
            if(product == null) return NotFound();
            _mapper.Map(productDto, product);

            if(productDto.File != null){
                var imageResult = await _imageService.AddImageAsync(productDto.File);

                if(imageResult.Error != null) return BadRequest(new ProblemDetails {Title = "Error for update product"});

                if (!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok(product);
            return BadRequest(new ProblemDetails {Title = "Error for edit product"});
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<ActionResult> RemoveProduct(int id){
            var product = await _context.Products.FindAsync(id);
            if(product == null) return NotFound();
            if (!string.IsNullOrEmpty(product.PublicId)) await _imageService.DeleteImageAsync(product.PublicId);
            _context.Products.Remove(product);
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails {Title = "Error for remove product"});
        }
    }
}
