using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WeatherAlertsApi.Core.Interfaces.Api;

namespace WeatherAlertsApi.Core.Services;

public class UserService : IUserService
{
    private IHttpContextAccessor _context;

    public UserService(IHttpContextAccessor context)
    {
        _context = context;
    }
    public ClaimsPrincipal User => _context.HttpContext.User;

    public string CurrentUserId => User.FindFirstValue(ClaimTypes.Name);
}
