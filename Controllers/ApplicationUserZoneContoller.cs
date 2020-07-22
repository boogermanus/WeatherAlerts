using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using capstone.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using capstone.Models;
using System;

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

        [HttpGet]
        public async Task<List<ApplicationUserZone>> GetUserZone([FromQuery]string userId)
        {
            if(string.IsNullOrEmpty(userId))
                userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            return await _context.ApplicationUserZones.Where(auz => auz.UserId == userId).ToListAsync();
        }

        [HttpGet("all")]
        public async Task<List<ApplicationUserZone>> GetAllUserZones()
        {
            return await _context.ApplicationUserZones.Include(auz => auz.User).ToListAsync();
        }

        [HttpPost]
        public async Task<ApplicationUserZone> PostUserZone([FromBody]ApplicationUserZone zone) 
        {
            if(zone.UserId == null)
                zone.UserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            // zone.CreatedOn = DateTime.Now;
            
            _context.ApplicationUserZones.Add(zone);
            await _context.SaveChangesAsync();

            return zone;
        }

        [HttpDelete("{id}")]
        public async Task<ApplicationUserZone> DeleteUserZone(int id)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var userZone = await _context.ApplicationUserZones
                .Where(auz => auz.UserId == userId && auz.Id == id)
                .FirstOrDefaultAsync();
            
            if(userZone != null)
            {
                _context.ApplicationUserZones.Remove(userZone);
                await _context.SaveChangesAsync();
            }

            return userZone;
        }
    }
}
