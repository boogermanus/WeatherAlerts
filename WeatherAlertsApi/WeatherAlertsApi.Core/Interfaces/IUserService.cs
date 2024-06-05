using System.Security.Claims;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IUserService
{
    public ClaimsPrincipal User {get;}
    public string CurrentUserId {get;}
}