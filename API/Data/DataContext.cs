using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<AdminUser> AdminUsers { get; set; } = default!;
        public DbSet<VehicleGroup> VehicleGroups { get; set; } = default!;
        public DbSet<AdminUserVehicleGroup> AdminUserVehicleGroups { get; set; } = default!;
        public DbSet<Vehicle> Vehicles { get; set; } = default!;
        public DbSet<Group> Groups { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdminUser>()
                .ToTable("Admin.Users", "dbo")
                .HasKey(u => u.PK_UserID);

            modelBuilder.Entity<VehicleGroup>()
                .ToTable("Vehicle.Groups", "dbo")
                .HasKey(u => u.PK_VehicleGroupID);

            modelBuilder.Entity<AdminUserVehicleGroup>()
                .ToTable("Admin.UserVehicleGroup", "dbo")
                .HasKey(u => new { u.FK_UserID, u.FK_VehicleGroupID });

            modelBuilder.Entity<Vehicle>()
                .ToTable("Vehicle.Vehicles", "dbo")
                .HasKey(u => u.PK_VehicleID);

            modelBuilder.Entity<Group>()
                .ToTable("Vehicle.Groups", "dbo")
                .HasKey(u => u.PK_VehicleGroupID);
        }
    }
}
