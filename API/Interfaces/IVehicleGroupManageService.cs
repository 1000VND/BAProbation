using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IVehicleGroupManageService
    {
        Task<List<UserDto>> GetUser();
        Task<(IEnumerable<VehicleGroup>? notInGroup, IEnumerable<VehicleGroup>? inGroup)> GetUserVehicleGroups([FromQuery] string? userId);
    }
}
