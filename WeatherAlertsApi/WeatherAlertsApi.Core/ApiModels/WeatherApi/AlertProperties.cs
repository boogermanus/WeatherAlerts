namespace WeatherAlertsApi.Core.ApiModels;

public class AlertProperties
{
    public string id { get; set; }
    public string status { get; set; }
    public string category {get; set; }
    public string severity { get; set; }
    public string urgency { get; set; }
    public string Event {get;set;}
    public string senderName { get; set; }
    public string headline { get; set; }
    public string description { get; set; }
    public string response { get; set; }
    public string messageType { get; set; }
    public string certanty { get; set; }
    public string areaDesc { get; set; }
    public DateTime sent {get; set; }
    public DateTime effective { get; set; }
    public DateTime onset { get; set; }
    public DateTime expires { get; set; }
    public DateTime ends { get; set; }
    public string[]? areas { get; set; }
    public string? zoneId { get; set; }
// }
}