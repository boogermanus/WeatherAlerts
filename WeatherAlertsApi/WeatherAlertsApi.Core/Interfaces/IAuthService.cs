using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Core.Interfaces;

public interface IAuthService
{
    Task<IdentityResult> Register(RegistrationModel model);
    Task<AuthModel?> Login(LoginModel model);
    JwtSecurityToken Decode(AuthModel model);
    public bool Validate(AuthModel model);
}