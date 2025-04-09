using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AdminUsers_tbl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_[Admin.Users]",
                schema: "dbo",
                table: "[Admin.Users]");

            migrationBuilder.RenameTable(
                name: "[Admin.Users]",
                schema: "dbo",
                newName: "Admin.Users",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Admin.Users",
                schema: "dbo",
                table: "Admin.Users",
                column: "PK_UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Admin.Users",
                schema: "dbo",
                table: "Admin.Users");

            migrationBuilder.RenameTable(
                name: "Admin.Users",
                schema: "dbo",
                newName: "[Admin.Users]",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[Admin.Users]",
                schema: "dbo",
                table: "[Admin.Users]",
                column: "PK_UserID");
        }
    }
}
