using API.Data;
using API.DataTransferObject;
using API.Entities;
using API.Entities.Order;
using API.Extensions;
using API.ServicesToken;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BasicApiController
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<User> _userManager;
        private readonly StoreContext _context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userCart = await RetrieveCart(loginDto.Username);
            var anonCart = await RetrieveCart(Request.Cookies["buyerId"]);

            if (anonCart != null)
            {
                if (userCart != null)
                    _context.Carts.Remove(userCart);

                anonCart.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = anonCart != null ? anonCart.MapBasketToDto() : userCart?.MapBasketToDto()
            };
        }

        private async Task<Cart> RetrieveCart(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Carts
                .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");
            return CreatedAtAction(nameof(GetCurrentUser), new { username = user.UserName }, new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            });
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
                return NotFound();

            var userCart = await RetrieveCart(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = userCart?.MapBasketToDto()
            };
        }
    }
}
