using WeatherAlertsApi.Core.ApiModels.WeatherApi;
using WeatherAlertsApi.Core.Interfaces.WeatherApi;

namespace WeatherAlertsApi.Core.Services.WeatherApi;

public class ZoneService : IZoneService
{
    public IRestSharpService _restSharpService;
    public ZoneService(IRestSharpService service)
    {
        _restSharpService = service;
    }
    public async Task<Zones> GetByState(string state)
    {
        return await _restSharpService.Get<Zones>("https://api.weather.gov", "zones", new Dictionary<string, string>
        {
            {"area", state},
            {"type", "county"}
        });
    }
}
