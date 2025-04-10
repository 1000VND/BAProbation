using API.DTOs;

namespace API.Interfaces
{
    public interface IMediaVehicleService
    {
        Task<List<GroupDto>> GetAllGroups();
    }
}
