using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Vehicle.Vehicles")]
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long PK_VehicleID { get; set; }

        public int FK_CompanyID { get; set; }

        [MaxLength(16)]
        public required string VehiclePlate { get; set; }

        [MaxLength(50)]
        public required string PrivateCode { get; set; }

        [MaxLength(32)]
        public string? IMEI { get; set; }

        public bool? IsLocked { get; set; } = false;

        public bool? IsDeleted { get; set; } = false;

        public int XNCode { get; set; } = 0;

        public bool IsCam { get; set; } = false;

        public bool? IsVideoCam { get; set; }
    }
}
