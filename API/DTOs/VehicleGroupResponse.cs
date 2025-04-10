using API.Entities;

namespace API.DTOs
{
    public class VehicleGroupResponse
    {
        public IEnumerable<VehicleGroup>? NotInGroup { get; set; }
        public IEnumerable<VehicleGroup>? InGroup { get; set; }
    }
}
