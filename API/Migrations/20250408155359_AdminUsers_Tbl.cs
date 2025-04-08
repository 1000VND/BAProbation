using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AdminUsers_Tbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Admin");

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "Admin",
                columns: table => new
                {
                    PK_UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FK_CompanyID = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserNameLower = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    UserType = table.Column<byte>(type: "tinyint", nullable: false),
                    IsLock = table.Column<bool>(type: "bit", nullable: false),
                    LastPasswordChanged = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChangePasswordAfterDays = table.Column<short>(type: "smallint", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockLevel = table.Column<byte>(type: "tinyint", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedIP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UpdatedIP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AllowedAccessIP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UseSecurityCodeSMS = table.Column<bool>(type: "bit", nullable: false),
                    UsernameBAP = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    LoginType = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    SuperiorSaleID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExtendChangePasswordDays = table.Column<short>(type: "smallint", nullable: false),
                    IsActived = table.Column<bool>(type: "bit", nullable: false),
                    ActivedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RequiredChangePasswordDays = table.Column<short>(type: "smallint", nullable: false),
                    IsWeakPassword = table.Column<bool>(type: "bit", nullable: true),
                    KeepWeakPasswordDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.PK_UserID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users",
                schema: "Admin");
        }
    }
}
