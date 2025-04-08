using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IVehicleGroupManageService
    {
        Task<List<AdminUser>> GetUser();
    }
}
