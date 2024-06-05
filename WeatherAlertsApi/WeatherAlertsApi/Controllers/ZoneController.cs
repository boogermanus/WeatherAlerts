using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels;
using WeatherAlertsApi.Core.Interfaces;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ZoneController : Controller
{
    private readonly IRestSharpService _restSharpService;

    public ZoneController(IRestSharpService service)
    {
        _restSharpService = service;
    }

    [HttpGet]
    public async Task<Zones> GetByState([FromQuery]string state)
    {
        return await _restSharpService.Get<Zones>("https://api.weather.gov", "zones", new Dictionary<string, string>
        {
            {"area", state},
            {"type", "county"}
        });
    }
}