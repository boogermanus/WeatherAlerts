using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels;
using WeatherAlertsApi.Core.Interfaces;
using WeatherAlertsApi.Core.Models;
using WeatherAlertsApi.Infrastrcture;

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
        var result = await _userZoneService.GetUserZones(userId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddUserZone(UserZoneModel model)
    {
        var result = await _userZoneService.AddUserZone(model);

        return Ok(result);
    }

}