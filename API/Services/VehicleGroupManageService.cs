using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class VehicleGroupManageService : IVehicleGroupManageService
    {
        private readonly DataContext _context;

        public VehicleGroupManageService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetUser()
        {
            var data = await _context.AdminUsers.Where(e => e.IsDeleted == false && e.FK_CompanyID == 15076 && e.IsLock == false).Select(e =>
                new UserDto
                {
                    PK_UserID = e.PK_UserID,
                    FK_CompanyID = e.FK_CompanyID,
                    Username = e.Username,
                    UserNameLower = e.UserNameLower,
                    Fullname = e.Fullname
                }).ToListAsync();

            return data;
        }
    }
}
