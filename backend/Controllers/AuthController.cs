using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
      [HttpPost("/login")]
      public IActionResult Login(string username, string password)
      {
          if (username == "admin" && password == "admin")
          {
              HttpContext.Session.SetString("User", "admin");
              return Ok("Login successful");
          }
          return Unauthorized("Invalid credentials");
      }
    }
}