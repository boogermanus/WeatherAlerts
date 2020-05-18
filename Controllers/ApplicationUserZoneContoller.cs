using capstone.Data;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace capstone.Controllers
{
    [Route("[controller]")]
    public class ApplicationUserZoneController : Controller
    {
        // learn how to use this
        // private readonly ILogger<OidcConfigurationController> logger;
        private readonly ApplicationDbContext _context;

        public ApplicationUserZoneController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
