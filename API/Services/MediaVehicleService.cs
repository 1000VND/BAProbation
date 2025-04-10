using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
            var data = await _context.Groups.Where(e => e.IsDeleted == null || e.IsDeleted == false).ToListAsync();

            var result = _mapper.Map<List<GroupDto>>(data);

            return result;
        }
    }
}
