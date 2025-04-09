using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UserDto
    {
        public Guid PK_UserID { get; set; }
        public int FK_CompanyID { get; set; }
        [StringLength(50)]
        public required string Username { get; set; }
        [StringLength(50)]
        public required string UserNameLower { get; set; }
        [StringLength(250)]
        public required string Fullname { get; set; }
    }
}
