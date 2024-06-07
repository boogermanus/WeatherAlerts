using WeatherAlertsApi.Core.ApiModels.WeatherApi;

namespace WeatherAlertsApi.Core.Interfaces;
public interface IZoneService
{
    Task<Zones> GetByState(string state);
}