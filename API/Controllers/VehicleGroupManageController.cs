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

        [HttpGet]
        public async Task<ActionResult<List<AdminUser>>> GetUser()
        {
            var data = await _vehicleGroupManageService.GetUser();

            return Ok(data);
        }
    }
}
