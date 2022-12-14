using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using zadatak_vlatkalausic_backend.Data;
using zadatak_vlatkalausic_backend.Models;

namespace zadatak_vlatkalausic_backend.Services
{
    public class UserService: IUserService
    {
        private IConfiguration _configuration;
        private readonly DatabaseContext _databaseContext;
        public UserService(IConfiguration configuration, DatabaseContext databaseContext)
        {
            _configuration = configuration;
            _databaseContext = databaseContext;
        }

        public string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(60),
              signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public User? Authenticate(UserLogin userLogin)
        {
            var currentUser = _databaseContext.Users.FirstOrDefault(o => o.Username == userLogin.Username && o.Password == userLogin.Password);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

    }
}
