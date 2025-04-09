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
        public async Task<ActionResult<List<AdminUser>>> GetAllUser()
        {
            var data = await _vehicleGroupManageService.GetUser();

            return Ok(data);
        }
    }
}
