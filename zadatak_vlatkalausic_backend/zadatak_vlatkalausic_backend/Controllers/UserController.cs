using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using zadatak_vlatkalausic_backend.Models;
using zadatak_vlatkalausic_backend.Services;

namespace zadatak_vlatkalausic_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            var user = _userService.Authenticate(userLogin);

            if (user != null)
            {
                var token = _userService.Generate(user);
                return Ok(token);
            }

            return BadRequest("User not found!");
        }
        /*private string Generate(User user)
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

        private User? Authenticate(UserLogin userLogin)
        {
            //var currentUser = UserConstants.Users.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == userLogin.Password);
            //var currentUser = UserConstants.Admin.FirstOrDefault(o => o.Username.ToLower() == userLogin.Username.ToLower() && o.Password == userLogin.Password);
            var currentUser = _databaseContext.Users.FirstOrDefault(o => o.Username == userLogin.Username && o.Password == userLogin.Password);
            if (currentUser != null){
                return currentUser;
            }
            return null;
        }*/
    }
}
