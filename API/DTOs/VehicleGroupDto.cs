using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class VehicleGroupDto
    {
        public required string VehiclePlate { get; set; }
        public required string PlateAndCode { get; set; }
        public int XNCode { get; set; } = 0;
    }
}
