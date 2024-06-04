
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using WeatherAlertsApi.Core.ApiModels;
using WeatherAlertsApi.Core.Interfaces;
using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.Services;

public class AuthService : IAuthService
{
    public readonly UserManager<User> _userManager;
    public readonly IConfiguration _configuration;

    public AuthService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<IdentityResult> Register(RegistrationModel model)
    {
        return await _userManager.CreateAsync(model.ToDomainModel(), model.Password);
    }
}
