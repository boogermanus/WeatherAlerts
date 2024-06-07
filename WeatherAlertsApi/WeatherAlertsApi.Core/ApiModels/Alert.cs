namespace WeatherAlertsApi.Core.ApiModels;

public class Alert
{
    public string id { get; set; }
    public string type { get; set; }
    public IEnumerable<AlertProperties> properties { get; set; }
}