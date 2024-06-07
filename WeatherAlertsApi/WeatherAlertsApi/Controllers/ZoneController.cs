using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.Interfaces;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ZoneController : Controller
{
    private readonly IZoneService _zoneService;

    public ZoneController(IZoneService service)
    {
        _zoneService = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetByState([FromQuery]string state)
    {
        var result = await _zoneService.GetByState(state);
        return Ok(result);
    }
}