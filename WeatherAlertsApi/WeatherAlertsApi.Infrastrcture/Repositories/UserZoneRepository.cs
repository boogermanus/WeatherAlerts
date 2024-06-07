using Microsoft.EntityFrameworkCore;
using WeatherAlertsApi.Core.Interfaces.Api;
using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Infrastrcture.Repositories;

public class UserZoneRepository : BaseRepository<UserZone>, IUserZoneRepository
{
    public UserZoneRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<UserZone>> GetByUserId(string userId)
    {
        return await Entities.Where(e => e.UserId == userId).ToListAsync();
    }
}