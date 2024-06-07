namespace WeatherAlertsApi.Core.ApiModels.Api;

public class AuthModel
{
    public string access_token { get; set; } = "";
    public string access_type {get;set;} = "bearer";
    public AuthModel() {}

    public AuthModel(string token)
    {
        access_token = token;
    }
}