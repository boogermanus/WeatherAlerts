using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using WeatherAlertsApi.Core.ApiModels.Api;

namespace WeatherAlertsApi.Core.Interfaces.Api;

public interface IAuthService
{
    Task<IdentityResult> Register(RegistrationModel model);
    Task<AuthModel?> Login(LoginModel model);
    JwtSecurityToken Decode(AuthModel model);
    public bool Validate(AuthModel model);
}