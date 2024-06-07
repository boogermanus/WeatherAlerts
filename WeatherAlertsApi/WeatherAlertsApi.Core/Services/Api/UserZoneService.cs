using WeatherAlertsApi.Core.ApiModels.Api;
using WeatherAlertsApi.Core.Interfaces.Api;

namespace WeatherAlertsApi.Core.Services.Api;

public class UserZoneService : IUserZoneService
{
    private readonly IUserZoneRepository _userZoneRepository;
    private readonly IUserService _userService;

    public UserZoneService(IUserZoneRepository repository, IUserService userService)
    {
        _userZoneRepository = repository;
        _userService = userService;
    }

    public async Task<UserZoneModel> AddUserZone(UserZoneModel userZoneModel)
    {
        var model = userZoneModel.ToDomainModel();
        model.CreateDate = DateTime.Now;
        model.Visible = true;

        var result = await _userZoneRepository.Add(model);

        return result.ToApiModel();
    }

    public async Task<IEnumerable<UserZoneModel>> GetAllUserZones()
    {
        var result = await _userZoneRepository.GetAll();
        return result.Select(ur => ur.ToApiModel());
    }

    public async Task<IEnumerable<UserZoneModel>> GetUserZones(string? userId)
    {
        if(string.IsNullOrEmpty(userId))
            userId = _userService.CurrentUserId;

        var results = await _userZoneRepository.GetByUserId(userId);
        return results.Select(ur => ur.ToApiModel());
    }
}
