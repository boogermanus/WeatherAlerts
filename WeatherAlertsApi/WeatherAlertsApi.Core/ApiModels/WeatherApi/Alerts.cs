namespace WeatherAlertsApi.Core.ApiModels.WeatherApi;

public class Alerts
{
    public string type { get; set; }
    public IEnumerable<AlertProperties> features { get; set; }
}