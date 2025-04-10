using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Users", Schema = "Admin")]
    public class AdminUser
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
        public byte UserType { get; set; } = 0; // Default value (0: Normal, 1: Administrator)
        public bool IsLock { get; set; } = false; // Default value (0: not locked)
        public DateTime? LastPasswordChanged { get; set; }
        public short? ChangePasswordAfterDays { get; set; } = 0; // Default value
        public Guid CreatedByUser { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedByUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public byte? LockLevel { get; set; }
        public bool? IsDeleted { get; set; } = false; // Default value
        [StringLength(50)]
        public string? PhoneNumber { get; set; }
        [StringLength(50)]
        public string? CreatedIP { get; set; }
        [StringLength(50)]
        public string? UpdatedIP { get; set; }
        [StringLength(50)]
        public string? Email { get; set; }
        public string? AllowedAccessIP { get; set; }
        public bool UseSecurityCodeSMS { get; set; } = false; // Default value
        [StringLength(300)]
        public string? UsernameBAP { get; set; }
        [StringLength(500)]
        public string? LoginType { get; set; }
        public Guid? SuperiorSaleID { get; set; }
        public short ExtendChangePasswordDays { get; set; } = 5; // Default value
        public bool IsActived { get; set; } = true; // Default value
        public DateTime? ActivedDate { get; set; }
        public short RequiredChangePasswordDays { get; set; } = 3; // Default value
        public bool? IsWeakPassword { get; set; }
        public DateTime? KeepWeakPasswordDate { get; set; }
    }
}
