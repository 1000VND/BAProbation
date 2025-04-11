using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class VehicleGroupDto
    {
        public long PK_VehicleID { get; set; }
        public required string PlateAndCode { get; set; }
    }
}
