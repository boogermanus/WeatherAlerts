using WeatherAlertsApi.Core.ApiModels.Api;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IUserZoneService
{
    Task<IEnumerable<UserZoneModel>> GetUserZones(string userId);
    Task<IEnumerable<UserZoneModel>> GetAllUserZones();
    Task<UserZoneModel> AddUserZone(UserZoneModel userZone);
    
}