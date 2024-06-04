using Microsoft.AspNetCore.Mvc;

namespace WeatherAlertsApi.Controllers;
[ApiController]
[Route("/")]
public class HomeController : Controller
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("WeatherAlertsApi");
    }

}