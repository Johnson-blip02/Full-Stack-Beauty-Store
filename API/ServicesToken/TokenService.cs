using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.ServicesToken
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public async Task<string> GenerateToken(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenKey = _config["JWTSettings:TokenKey"];
            if (string.IsNullOrEmpty(tokenKey)) throw new InvalidOperationException("Token key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken(
                issuer: _config["JWTSettings:Issuer"],
                audience: _config["JWTSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(_config.GetValue<double>("JWTSettings:TokenExpirationDays", 14)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
