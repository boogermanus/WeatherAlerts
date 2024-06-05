using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WeatherAlertsApi.Core.Models;
using WeatherAlertsApi.Infrastrcture;

namespace WeatherAlertsApi.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class UserZoneController : Controller
{
    private readonly AppDbContext _context;
    public UserZoneController(AppDbContext context)
    {
        _context = context;
    }
}