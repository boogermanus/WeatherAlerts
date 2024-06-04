using Microsoft.AspNetCore.Identity;
using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IAuthService
{
    Task<IdentityResult> Register(RegistrationModel model);
}