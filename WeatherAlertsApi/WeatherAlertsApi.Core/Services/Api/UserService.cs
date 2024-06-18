using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WeatherAlertsApi.Core.Interfaces.Api;

namespace WeatherAlertsApi.Core.Services.Api;

public class UserService : IUserService
{
    private IHttpContextAccessor _context;

    public UserService(IHttpContextAccessor context)
    {
        _context = context;
    }
    public ClaimsPrincipal User => _context.HttpContext.User;

    public string CurrentUserId => User.FindFirstValue(JwtRegisteredClaimNames.Name) ?? string.Empty;
}
