namespace API.DTOs
{
    public class GroupDto
    {
        public int PK_VehicleGroupID { get; set; }
        public int? ParentVehicleGroupID { get; set; }
        public required string Name { get; set; }
    }
}
