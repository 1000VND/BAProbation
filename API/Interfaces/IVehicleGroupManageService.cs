using API.DTOs;

namespace API.Interfaces
{
    public interface IVehicleGroupManageService
    {
        Task<List<UserDto>> GetUser();
    }
}
