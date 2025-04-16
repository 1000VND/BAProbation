using API.DTOs;
using API.Extensions;
using API.Helpers;
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

        [HttpPost("GetVehicles")]
        public async Task<ActionResult<List<VehicleGroupDto>>> GetVehicles(List<int> groupIds)
        {
            var data = await _mediaVehicleService.GetVehicleGroups(groupIds);

            return data;
        }

        [HttpPost("GetPictures")]
        public async Task<ActionResult<PagedList<PictureDto>>> GetPictures(PictureParams pictureParams)
        { 
            var result = await _mediaVehicleService.GetPictures(pictureParams);

            Response.AddPaginationHeader(new PaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages));

            return result;
        }
    }
}
