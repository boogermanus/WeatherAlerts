using WeatherAlertsApi.Core.Models;

namespace WeatherAlertsApi.Core.ApiModels;

public class UserZoneModel
{
    public int Id { get; set; }
    public string ZoneId { get; set; }
    public DateTime CreateDate { get; set; }
    public bool Visible { get; set; }
    public string UserId { get; set; }

    public UserZone ToDomainModel()
    {
        return new UserZone
        {
            Id = Id,
            ZoneId = ZoneId,
            Visible = Visible,
            UserId = UserId
        };
    }
}