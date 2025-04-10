using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("UserVehicleGroup", Schema = "Admin")]
    public class AdminUserVehicleGroup
    {
        public Guid FK_UserID { get; set; }
        public int FK_VehicleGroupID { get; set; }
        public int? ParentVehicleGroupID { get; set; }
        public Guid? CreatedByUser { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.Now; // Default value (getdate())
        public Guid? UpdateByUser { get; set; }
        public DateTime? UpdatedDate { get; set; } = DateTime.Now; // Default value (getdate())
        public Guid? UpdatedByUser { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
