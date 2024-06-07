using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.Interfaces.Api;

public interface IUserZoneRepository : IBaseRepository<UserZone>
{
    public Task<IEnumerable<UserZone>> GetByUserId(string userId);
}