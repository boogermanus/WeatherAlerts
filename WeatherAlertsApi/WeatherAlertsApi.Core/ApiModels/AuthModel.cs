namespace WeatherAlertsApi.Core.ApiModels;

public class AuthModel
{
    public string Token { get; set; }
    public AuthModel() {}

    public AuthModel(string token)
    {
        Token = token;
    }
}