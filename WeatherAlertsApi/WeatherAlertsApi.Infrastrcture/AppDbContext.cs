﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Infrastrcture;

public class AppDbContext : IdentityDbContext<User>
{
    public DbSet<UserZone> UserZones { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
