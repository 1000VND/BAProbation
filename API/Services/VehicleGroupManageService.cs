using API.Data;
using API.Entities;
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

        public async Task<List<AdminUser>> GetUser()
        {
            var data = await _context.AdminUsers.Where(e => e.IsDeleted == true && e.FK_CompanyID == 15076).ToListAsync();

            return data;
        }
    }
}
