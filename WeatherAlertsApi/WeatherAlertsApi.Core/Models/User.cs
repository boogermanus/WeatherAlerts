using Microsoft.AspNetCore.Identity;
namespace WeatherAlertsApi.Core.Models;

public class User : IdentityUser
{
    public string Name { get; set; } = string.Empty;
}