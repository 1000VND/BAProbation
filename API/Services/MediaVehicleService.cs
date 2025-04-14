using API.Data;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class MediaVehicleService : IMediaVehicleService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MediaVehicleService(
            DataContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<GroupDto>> GetAllGroups()
        {
            var data = await (from g in _context.Groups
                              join v in _context.VehicleGroups.Where(e => e.IsDeleted == null || e.IsDeleted == false) on g.PK_VehicleGroupID equals v.FK_VehicleGroupID into gv
                              where g.IsDeleted == null || g.IsDeleted == false
                              select new GroupDto
                              {
                                  PK_VehicleGroupID = g.PK_VehicleGroupID,
                                  ParentVehicleGroupID = g.ParentVehicleGroupID,
                                  Name = g.Name,
                                  CountVehicle = gv.Count()
                              }).ToListAsync();

            return data;
        }

        public async Task<List<VehicleGroupDto>> GetVehicleGroups(List<int> groupIds)
        {
            var result = new List<VehicleGroupDto>();

            var data = await (from g in _context.Groups
                              join vg in _context.VehicleGroups on g.PK_VehicleGroupID equals vg.FK_VehicleGroupID
                              join v in _context.Vehicles on vg.FK_VehicleID equals v.PK_VehicleID
                              where (g.IsDeleted == null || g.IsDeleted == false)
                                 && (vg.IsDeleted == null || vg.IsDeleted == false)
                                 && (v.IsDeleted == null || v.IsDeleted == false)
                                 && (v.IsLocked == null || v.IsLocked == false)
                                 && ((groupIds.Count == 1 && groupIds[0] == 0) || groupIds.Contains(g.PK_VehicleGroupID))
                              select v).Distinct().ToListAsync();

            foreach (var item in data)
            {
                var vehicle = new VehicleGroupDto()
                {
                    PK_VehicleID = item.PK_VehicleID,
                    PlateAndCode = item.PrivateCode.Equals(item.VehiclePlate)
                                    ? item.PrivateCode : item.PrivateCode + " (" + item.VehiclePlate + ")"
                };
                result.Add(vehicle);
            }

            return result;

        }
    }
}
