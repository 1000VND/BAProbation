using API.DTOs;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMediaVehicleService
    {
        Task<List<GroupDto>> GetAllGroups();
        Task<List<VehicleGroupDto>> GetVehicleGroups(List<int> groupIds);
        Task<PagedList<PictureDto>> GetPictures(PictureParams pictureParams);
    }
}
