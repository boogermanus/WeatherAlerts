using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ZoneController : Controller
{
    [HttpGet]
    public async Task<Zones> GetByState([FromQuery]string state)
    {
        var options = new RestClientOptions("https://api.weather.gov");
        var client = new RestClient(options);
        var request = new RestRequest("zones")
        .AddQueryParameter("area", state)
        .AddQueryParameter("type","county");

        var response = await client.GetAsync(request);
        var zones = JsonConvert.DeserializeObject<Zones>(response.Content);

        return zones;
    }
}