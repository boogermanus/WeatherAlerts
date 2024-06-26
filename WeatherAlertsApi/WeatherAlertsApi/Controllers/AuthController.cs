using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.ApiModels.Api;
using WeatherAlertsApi.Core.Interfaces.Api;

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
            return Ok(true);

        result.Errors.ToList().ForEach(e => ModelState.AddModelError(e.Code, e.Description));

        return BadRequest(ModelState);

    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var result = await _authService.Login(model);

        if (result == null)
            return Unauthorized();

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("decode")]
    public IActionResult Decode([FromBody] AuthModel model)
    {
        return Ok(_authService.Decode(model));
    }

    [AllowAnonymous]
    [HttpPost("validate")]
    public IActionResult Validate([FromBody] AuthModel model)
    {
        try
        {
            return Ok(_authService.Validate(model));
        }
        catch (Exception)
        {
            return Ok(false);
        }
    }

}