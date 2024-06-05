namespace WeatherAlertsApi.Core.ApiModels;

public class Zones
{
    public string type { get; set; }
    public IEnumerable<Zone> features { get; set; }
}