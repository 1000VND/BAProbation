using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Vehicle.VehicleGroups")]
    public class VehicleGroup
    {
        [Key]
        [Column(Order = 0)] // Composite Key Part 1
        public int FK_VehicleGroupID { get; set; }

        [Key]
        [Column(Order = 1)] // Composite Key Part 2
        public int FK_VehicleID { get; set; }

        public int FK_CompanyID { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
