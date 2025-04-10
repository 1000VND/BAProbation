using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("Groups", Schema = "Vehicle")]
    public class Group
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)] 
        public int PK_VehicleGroupID { get; set; }

        public int FK_CompanyID { get; set; }

        public int? ParentVehicleGroupID { get; set; }

        [MaxLength(250)]
        public required string Name { get; set; }

        public Guid? CreatedByUser { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public Guid? UpdatedByUser { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; } = DateTime.Now;

        public double? DistanceA { get; set; }

        public double? DistanceB { get; set; }

        public int? MinuteA { get; set; }

        public int? MinuteB { get; set; }

        public int? FK_BGTProvinceID { get; set; }

        public bool? IsDeleted { get; set; }

        public int Flag { get; set; } = 0;

        public bool? Status { get; set; } = true;
    }
}
