﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Groups", Schema = "Vehicle")]
    public class VehicleGroup
    {
        public int FK_CompanyID { get; set; }
        public int PK_VehicleGroupID { get; set; }
        public int? ParentVehicleGroupID { get; set; }
        [StringLength(250)]
        public required string Name { get; set; }
        public Guid? CreatedByUser { get; set; }
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public Guid? UpdatedByUser { get; set; }
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
