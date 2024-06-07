namespace WeatherAlertsApi.Core.Interfaces.WeatherApi;

public interface IRestSharpService
{
    Task<TEntity> Get<TEntity>(string url, string path, Dictionary<string,string>? parameters = null);
}