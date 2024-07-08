using System.ComponentModel.DataAnnotations;

namespace WeatherAlertsApi.Core.ApiModels.Api;

public class LoginModel
{
    [Required]
    [EmailAddress]
    public required string Username { get; set; }

    [Required]
    public required string Password { get; set; }
}