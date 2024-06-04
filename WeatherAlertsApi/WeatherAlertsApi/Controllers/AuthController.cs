using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels;
using WeatherAlertsApi.Core.Interfaces;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        var result = await _authService.Register(model);

        if (result.Succeeded)
            return Ok();

        result.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));

        return BadRequest(ModelState);

    }
}