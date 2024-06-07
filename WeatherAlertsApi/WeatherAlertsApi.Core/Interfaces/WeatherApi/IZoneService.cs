using WeatherAlertsApi.Core.ApiModels.WeatherApi;

namespace WeatherAlertsApi.Core.Interfaces.WeatherApi;
public interface IZoneService
{
    Task<Zones> GetByState(string state);
}