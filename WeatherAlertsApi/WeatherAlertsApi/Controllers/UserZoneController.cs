using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels.Api;
using WeatherAlertsApi.Core.Interfaces.Api;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class UserZonesController : Controller
{
    private readonly IUserZoneService _userZoneService;
    public UserZonesController(IUserZoneService service)
    {
        _userZoneService = service;
    }

    [HttpGet("GetAllUserZones")]
    public async Task<IActionResult> GetAllUserZones()
    {
        var result = await _userZoneService.GetAllUserZones();

        return Ok(result);
    }

    [HttpGet("GetUserZones")]
    public async Task<IActionResult> GetUserZones([FromQuery]string? userId = null)
    {
        var result = await _userZoneService.GetUserZones(userId ?? string.Empty);
        return Ok(result);
    }

    [HttpPost("AddUserZone")]
    public async Task<IActionResult> AddUserZone([FromBody]UserZoneModel model)
    {
        var result = await _userZoneService.AddUserZone(model);

        return Ok(result);
    }

}