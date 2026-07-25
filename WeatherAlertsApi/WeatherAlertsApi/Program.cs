using WeatherAlertsApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5004");

builder.Services.RegisterCommonServices()
    .RegisterDatabaseServices(builder.Configuration)
    .RegisterAppServices();

builder.BuildApp().Run();
