using RestSharp;
using WeatherAlertsApi.Core.Interfaces;

namespace WeatherAlertsApi.Core.Services;

public class RestSharpService : IRestSharpService
{
    public async Task<TEntity> Get<TEntity>(string url, string path, Dictionary<string, string>? parameters = null)
    {
        var options = new RestClientOptions(url);
        var client = new RestClient(options);
        var request = new RestRequest(path);

        if(parameters != null)
        {
            foreach(var key in parameters.Keys)
            {
                request.AddQueryParameter(key, parameters[key]);
            }
        }

        return await client.GetAsync<TEntity>(request);
    }
}
