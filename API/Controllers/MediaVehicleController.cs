using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaVehicleController : ControllerBase
    {
        private readonly IMediaVehicleService _mediaVehicleService;

        public MediaVehicleController(
                IMediaVehicleService mediaVehicleService
            )
        {
            _mediaVehicleService = mediaVehicleService;
        }

        [HttpGet("GetAllGroups")]
        public async Task<ActionResult<List<GroupDto>>> GetAllGroup()
        {
            var data = await _mediaVehicleService.GetAllGroups();

            return data;
        }
    }
}
