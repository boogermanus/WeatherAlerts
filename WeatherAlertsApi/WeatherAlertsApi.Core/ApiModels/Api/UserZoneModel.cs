using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.ApiModels.Api;

public class UserZoneModel
{
    public required string ZoneId { get; set; }
    public DateTime CreateDate { get; set; }
    public bool Visible { get; set; }

    public UserZone ToDomainModel()
    {
        return new UserZone
        {
            ZoneId = ZoneId,
            Visible = Visible,
            CreateDate = CreateDate,
        };
    }
}