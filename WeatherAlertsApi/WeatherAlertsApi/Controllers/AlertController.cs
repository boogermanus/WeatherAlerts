using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels.WeatherApi;
using WeatherAlertsApi.Core.Interfaces.WeatherApi;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AlertController : Controller
{
    private readonly IAlertsService _alertsService;

    public AlertController(IAlertsService serivce)
    {
        _alertsService = serivce;
    }

    [HttpGet("GetAllAlerts")]
    public async Task<IActionResult> GetAllAlerts()
    {
        var result = await _alertsService.GetActiveAlerts();

        return Ok(result);
    }
}