using WeatherAlertsApi.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WeatherAlertsApi.Infrastructure
{
    public class AppDbContext : IdentityDbContext<User>
    {   

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }
    }
}