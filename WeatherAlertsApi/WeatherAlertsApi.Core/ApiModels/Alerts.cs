namespace WeatherAlertsApi.Core.ApiModels;

public class Alerts
{
    public string type { get; set; }
    public IEnumerable<Alert> features { get; set; }
}