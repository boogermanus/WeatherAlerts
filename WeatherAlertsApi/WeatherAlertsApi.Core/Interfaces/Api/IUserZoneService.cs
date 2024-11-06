using WeatherAlertsApi.Core.ApiModels.Api;

namespace WeatherAlertsApi.Core.Interfaces.Api;

public interface IUserZoneService
{
    Task<IEnumerable<UserZoneModel>> GetUserZones(string userId);
    Task<IEnumerable<UserZoneModel>> GetAllUserZones();
    Task<UserZoneModel> AddUserZone(UserZoneModel userZone);
    Task<UserZoneModel?> DeleteUserZone(string zoneId);
    
}