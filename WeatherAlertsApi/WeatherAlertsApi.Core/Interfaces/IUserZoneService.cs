using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IUserZoneService
{
    Task<IEnumerable<UserZoneModel>> GetUserZones(string userId);
    Task<IEnumerable<UserZoneModel>> GetAllUserZones();
}