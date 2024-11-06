namespace WeatherAlertsApi.Core.ApiModels.WeatherApi;

public class Alerts
{
    public string? type { get; set; }
    public IEnumerable<Alert>? features { get; set; }
}