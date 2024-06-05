using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WeatherAlertsApi.Core.ApiModels;

namespace WeatherAlertsApi.Core.Models;

public class UserZone
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id {get;set;}
    [Required]
    public string ZoneId {get;set;}
    public DateTime CreateDate {get;set;}
    public bool Visible {get;set;}
    [Required]
    public string UserId {get;set;}
    public User User {get;set;}

    public UserZoneModel ToApiModel()
    {
        return new UserZoneModel
        {
            Id = Id,
            CreateDate = CreateDate,
            Visible = Visible,
            UserId = UserId,
        };
    }
}