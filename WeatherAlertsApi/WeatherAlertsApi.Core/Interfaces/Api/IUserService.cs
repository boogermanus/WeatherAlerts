using System.Security.Claims;

namespace WeatherAlertsApi.Core.Interfaces.Api;

public interface IUserService
{
    public ClaimsPrincipal? User {get;}
    public string CurrentUserId {get;}
}