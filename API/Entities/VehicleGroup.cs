using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Vehicle.VehicleGroups")]
    public class VehicleGroup
    {
        [Key]
        [Column(Order = 0)]
        public int FK_VehicleGroupID { get; set; }

        [Key]
        [Column(Order = 1)]
        public int FK_VehicleID { get; set; }

        public int FK_CompanyID { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
