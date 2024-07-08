namespace WeatherAlertsApi.Core.ApiModels.WeatherApi;

public class Alert
{
    public string id { get; set; }
    public string type { get; set; }
    public AlertProperties properties { get; set; }
}