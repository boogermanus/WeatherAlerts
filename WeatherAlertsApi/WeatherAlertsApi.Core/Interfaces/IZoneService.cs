using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Core.Interfaces;
public interface IZoneService
{
    Task<Zones> GetByState(string state);
}