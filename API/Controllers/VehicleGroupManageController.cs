using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleGroupManageController : ControllerBase
    {
        private readonly IVehicleGroupManageService _vehicleGroupManageService;

        public VehicleGroupManageController(
                IVehicleGroupManageService vehicleGroupManageService
            )
        {
            _vehicleGroupManageService = vehicleGroupManageService;
        }

        [HttpGet("GetAllUser")]
        public async Task<ActionResult<List<UserDto>>> GetAllUser()
        {
            var data = await _vehicleGroupManageService.GetUser();

            return Ok(data);
        }

        [HttpPost("GetUserVehicleGroup")]
        public async Task<ActionResult<VehicleGroupResponse>> GetUserVehicleGroups([FromQuery] string? userId)
        {
            var data = await _vehicleGroupManageService.GetUserVehicleGroups(userId);

            var response = new VehicleGroupResponse
            {
                NotInGroup = data.notInGroup,
                InGroup = data.inGroup
            };

            return Ok(response);
        }
    }
}
