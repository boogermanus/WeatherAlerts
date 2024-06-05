using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IUserZoneRepository : IBaseRepository<UserZone>
{
    public Task<IEnumerable<UserZone>> GetByUserId(string userId);
}