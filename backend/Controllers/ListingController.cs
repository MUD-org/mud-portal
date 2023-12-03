using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListingController : ControllerBase {
      // This is temporary for testing purposes
      public static GameListing[] Listings = {
        new GameListing() { Id = 1, Name = "FOOMud" },
        new GameListing() { Id = 2, Name = "BarMud" },
        new GameListing() { Id = 3, Name = "ZedMud" }
      };

      [HttpGet("/listings")]
      public IActionResult GetListings() {
        return Ok(Listings);
      }

      [HttpGet("/listings/featured")]
      public IActionResult GetFeaturedListings() {
        return Ok(new GameListing[] {Listings[0], Listings[1]});
      }
    }
}