using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WeatherAlertsApi.Core.ApiModels;

public class LoginModel
{
    [Required]
    [EmailAddress]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    [Display(Name = "Confirm Password")]
    [Compare("Password", ErrorMessage = "Passwords do not match.")]
    public string ConfirmPassword { get; set; }
}