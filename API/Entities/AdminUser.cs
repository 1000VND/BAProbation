﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Admin.Users", Schema = "dbo")]
    public class AdminUser : EntityBase
    {
        public Guid PK_UserID { get; set; }
        public int FK_CompanyID { get; set; }
        [StringLength(50)]
        public required string Username { get; set; }
        [StringLength(50)]
        public required string UserNameLower { get; set; }
        [StringLength(250)]
        public required string Password { get; set; }
        [StringLength(250)]
        public required string Fullname { get; set; }
        public byte UserType { get; set; }
        public bool IsLock { get; set; }
        public DateTime? LastPasswordChanged { get; set; }
        public short? ChangePasswordAfterDays { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public byte? LockLevel { get; set; }
        [StringLength(50)]
        public string? PhoneNumber { get; set; }
        [StringLength(50)]
        public string? CreatedIP { get; set; }
        [StringLength(50)]
        public string? UpdatedIP { get; set; }
        [StringLength(50)]
        public string? Email { get; set; }
        public string? AllowedAccessIP { get; set; }
        public bool UseSecurityCodeSMS { get; set; }
        [StringLength(300)]
        public string? UsernameBAP { get; set; }
        [StringLength(500)]
        public string? LoginType { get; set; }
        public Guid? SuperiorSaleID { get; set; }
        public short ExtendChangePasswordDays { get; set; }
        public bool IsActived { get; set; }
        public DateTime? ActivedDate { get; set; }
        public short RequiredChangePasswordDays { get; set; }
        public bool? IsWeakPassword { get; set; }
        public DateTime? KeepWeakPasswordDate { get; set; }
    }
}
