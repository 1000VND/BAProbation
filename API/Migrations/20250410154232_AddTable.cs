using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin.Users",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Admin.UserVehicleGroup",
                schema: "dbo");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PK_VehicleGroupID",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateTable(
                name: "Vehicle.VehicleGroups",
                schema: "dbo",
                columns: table => new
                {
                    FK_VehicleGroupID = table.Column<int>(type: "int", nullable: false),
                    FK_VehicleID = table.Column<int>(type: "int", nullable: false),
                    FK_CompanyID = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle.VehicleGroups", x => new { x.FK_VehicleGroupID, x.FK_VehicleID });
                });

            migrationBuilder.CreateTable(
                name: "Vehicle.Vehicles",
                schema: "dbo",
                columns: table => new
                {
                    PK_VehicleID = table.Column<long>(type: "bigint", nullable: false),
                    FK_CompanyID = table.Column<int>(type: "int", nullable: false),
                    VehiclePlate = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    PrivateCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IMEI = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    IsLocked = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    XNCode = table.Column<int>(type: "int", nullable: false),
                    IsCam = table.Column<bool>(type: "bit", nullable: false),
                    IsVideoCam = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle.Vehicles", x => x.PK_VehicleID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicle.VehicleGroups",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Vehicle.Vehicles",
                schema: "dbo");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedDate",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PK_VehicleGroupID",
                schema: "dbo",
                table: "Vehicle.Groups",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateTable(
                name: "Admin.Users",
                schema: "dbo",
                columns: table => new
                {
                    PK_UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AllowedAccessIP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangePasswordAfterDays = table.Column<short>(type: "smallint", nullable: true),
                    CreatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedIP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ExtendChangePasswordDays = table.Column<short>(type: "smallint", nullable: false),
                    FK_CompanyID = table.Column<int>(type: "int", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    IsActived = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    IsLock = table.Column<bool>(type: "bit", nullable: false),
                    IsWeakPassword = table.Column<bool>(type: "bit", nullable: true),
                    KeepWeakPasswordDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastPasswordChanged = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockLevel = table.Column<byte>(type: "tinyint", nullable: true),
                    LoginType = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RequiredChangePasswordDays = table.Column<short>(type: "smallint", nullable: false),
                    SuperiorSaleID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedIP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UseSecurityCodeSMS = table.Column<bool>(type: "bit", nullable: false),
                    UserNameLower = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserType = table.Column<byte>(type: "tinyint", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UsernameBAP = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin.Users", x => x.PK_UserID);
                });

            migrationBuilder.CreateTable(
                name: "Admin.UserVehicleGroup",
                schema: "dbo",
                columns: table => new
                {
                    FK_UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FK_VehicleGroupID = table.Column<int>(type: "int", nullable: false),
                    CreatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    ParentVehicleGroupID = table.Column<int>(type: "int", nullable: true),
                    UpdateByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin.UserVehicleGroup", x => new { x.FK_UserID, x.FK_VehicleGroupID });
                });
        }
    }
}
