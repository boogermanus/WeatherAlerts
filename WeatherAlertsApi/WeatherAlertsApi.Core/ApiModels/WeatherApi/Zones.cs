namespace WeatherAlertsApi.Core.ApiModels.WeatherApi;

public class Zones
{
    public string? type { get; set; }
    public IEnumerable<Zone>? features { get; set; }
}