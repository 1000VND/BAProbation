using API.DTOs;

namespace API.Interfaces
{
    public interface IMediaVehicleService
    {
        Task<List<GroupDto>> GetAllGroups();
        Task<List<VehicleGroupDto>> GetVehicleGroups(List<int> groupIds);
    }
}
