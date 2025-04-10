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
            migrationBuilder.CreateTable(
                name: "Admin.UserVehicleGroup",
                schema: "dbo",
                columns: table => new
                {
                    FK_UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FK_VehicleGroupID = table.Column<int>(type: "int", nullable: false),
                    ParentVehicleGroupID = table.Column<int>(type: "int", nullable: true),
                    CreatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdateByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin.UserVehicleGroup", x => new { x.FK_UserID, x.FK_VehicleGroupID });
                });

            migrationBuilder.CreateTable(
                name: "Vehicle.Groups",
                schema: "dbo",
                columns: table => new
                {
                    PK_VehicleGroupID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FK_CompanyID = table.Column<int>(type: "int", nullable: false),
                    ParentVehicleGroupID = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CreatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedByUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DistanceA = table.Column<double>(type: "float", nullable: true),
                    DistanceB = table.Column<double>(type: "float", nullable: true),
                    MinuteA = table.Column<int>(type: "int", nullable: true),
                    MinuteB = table.Column<int>(type: "int", nullable: true),
                    FK_BGTProvinceID = table.Column<int>(type: "int", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: true),
                    Flag = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle.Groups", x => x.PK_VehicleGroupID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin.UserVehicleGroup",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Vehicle.Groups",
                schema: "dbo");
        }
    }
}
