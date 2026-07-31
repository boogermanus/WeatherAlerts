using Microsoft.OpenApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using WeatherAlertsApi.Infrastructure;
using WeatherAlertsApi.Core.Models;
using WeatherAlertsApi.Infrastructure.Repositories;
using WeatherAlertsApi.Core.Interfaces.Api;
using WeatherAlertsApi.Core.Services.Api;

namespace WeatherAlertsApi.Extensions;

public static class RegisterServiceExtensions
{
    public static IServiceCollection RegisterCommonServices(this IServiceCollection services)
    {
        services.AddControllers()
            .AddNewtonsoftJson();
        services.AddHttpContextAccessor();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Scheme = "bearer"
            });
            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("bearer", document)] = []
            });
        });
        return services;
    }

    public static IServiceCollection RegisterDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection") ??
            throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(connectionString));

        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddDefaultIdentity<User>()
            .AddEntityFrameworkStores<AppDbContext>();

        services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? string.Empty))
            });

        return services;
    }

    public static IServiceCollection RegisterAppServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddTransient<IUserService, UserService>();
        services.AddScoped<IUserZoneRepository, UserZoneRepository>();
        services.AddScoped<IUserZoneService, UserZoneService>();
        
        return services;
    }
}
