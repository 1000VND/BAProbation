using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class VehicleGroupManageService : IVehicleGroupManageService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VehicleGroupManageService(
            DataContext context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetUser()
        {
            var data = await _context.AdminUsers.Where(e => (e.IsDeleted == null || e.IsDeleted == false) && e.FK_CompanyID == 15076 && e.IsLock == false).ToListAsync();

            var result = new List<UserDto>();

            _mapper.Map(data, result);

            return result;
        }

        public async Task<(IEnumerable<VehicleGroup>? notInGroup, IEnumerable<VehicleGroup>? inGroup)> GetUserVehicleGroups([FromQuery] string? userId)
        {
            var allVehicleGroups = new List<VehicleGroup>();
            // Nếu userId là null, trả về tất cả các nhóm xe vào danh sách "notInGroup" và không có danh sách "inGroup"
            if (string.IsNullOrEmpty(userId))
            {
                allVehicleGroups = await _context.VehicleGroups
                    .Where(e => (e.IsDeleted == null || e.IsDeleted == false) && e.FK_CompanyID == 15076)
                    .ToListAsync();

                return (notInGroup: allVehicleGroups, inGroup: Enumerable.Empty<VehicleGroup>());
            }

            // Nếu userId không hợp lệ (không thể parse thành Guid), ném ngoại lệ
            if (!Guid.TryParse(userId, out var parsedUserId))
            {
                throw new ArgumentException("Invalid UserId format.", nameof(userId));
            }

            // Lấy danh sách các nhóm xe mà người dùng đã tham gia
            var inGroupIds = await _context.AdminUserVehicleGroups
                .Where(uvg => uvg.FK_UserID == parsedUserId)
                .Select(uvg => uvg.FK_VehicleGroupID)
                .ToListAsync();

            // Lấy danh sách tất cả các nhóm xe
            allVehicleGroups = await _context.VehicleGroups
                .Where(e => (e.IsDeleted == null || e.IsDeleted == false) && e.FK_CompanyID == 15076)
                .ToListAsync();

            // Lấy danh sách các nhóm xe mà người dùng chưa tham gia
            var notInGroup = allVehicleGroups
                .Where(vg => !inGroupIds.Contains(vg.PK_VehicleGroupID))
                .ToList();

            // Lấy danh sách các nhóm xe mà người dùng đã tham gia
            var inGroup = allVehicleGroups
                .Where(vg => inGroupIds.Contains(vg.PK_VehicleGroupID))
                .ToList();

            return (notInGroup, inGroup);
        }
    }
}
