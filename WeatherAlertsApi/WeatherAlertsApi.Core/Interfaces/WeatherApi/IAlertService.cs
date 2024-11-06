using WeatherAlertsApi.Core.ApiModels.WeatherApi;

namespace WeatherAlertsApi.Core.Interfaces.WeatherApi;

public interface IAlertsService
{
    Task<Alerts?> GetActiveAlerts();
}