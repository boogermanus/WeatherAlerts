using WeatherAlertsApi.Core.ApiModels.WeatherApi;
using WeatherAlertsApi.Core.Interfaces.WeatherApi;

namespace WeatherAlertsApi.Core.Services.WeatherApi;

public class AlertService : IAlertsService
{
    private readonly IRestSharpService _restSharpService;
    public AlertService(IRestSharpService service)
    {
        _restSharpService = service;
    }
    public async Task<Alerts?> GetActiveAlerts()
    {
        return await _restSharpService.Get<Alerts>(
            "https://api.weather.gov/",
            "alerts/active",
            new Dictionary<string, string> { { "status", "actual" } });
    }
}
