
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WeatherAlertsApi.Core.ApiModels.Api;
using WeatherAlertsApi.Core.Interfaces;
using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.Services;

public class AuthService : IAuthService
{
    public readonly UserManager<User> _userManager;
    public readonly IConfiguration _configuration;
    private readonly byte[] _key;
    public AuthService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
        _key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? string.Empty);
    }

    public async Task<IdentityResult> Register(RegistrationModel model)
    {
        return await _userManager.CreateAsync(model.ToDomainModel(), model.Password);
    }

    public async Task<AuthModel?> Login(LoginModel model)
    {
        var user = await AuthenticateUserAsync(model);

        if (user == null)
            return null;

        var token = GenerateJsonWebToken(user);

        return string.IsNullOrEmpty(token) ? null : new AuthModel(token);
    }

    private async Task<User?> AuthenticateUserAsync(LoginModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user == null)
            return null;

        var validPassword = await _userManager.CheckPasswordAsync(user, model.Password);

        if (validPassword)
            return user;

        return null;
    }

    private string GenerateJsonWebToken(User user)
    {
        var expires = int.Parse(_configuration["Jwt:Expires"]);
        var tokenHandler = new JwtSecurityTokenHandler();
        var credentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.NameId, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.UserName)
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(expires),
            signingCredentials: credentials);

        return tokenHandler.WriteToken(token);
    }

    public JwtSecurityToken Decode(AuthModel model)
    {
        var handler = new JwtSecurityTokenHandler();

        var token = handler.ReadJwtToken(model.access_token);

        return token;
    }

    public bool Validate(AuthModel model)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(_key)
        };

        var validated = tokenHandler.ValidateToken(model.access_token, validationParameters, out var tokenSecure);

        return validated != null && tokenSecure is JwtSecurityToken;
    }

}
