namespace WeatherAlertsApi.Core.ApiModels.WeatherApi;

public class Zone 
{
    public string id { get; set; } = "";
    public string type { get; set; } = "";
    public ZoneProperties? properties { get; set; }
}