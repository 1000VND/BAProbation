﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.AdminUser", b =>
                {
                    b.Property<Guid>("PK_UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("ActivedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("AllowedAccessIP")
                        .HasColumnType("nvarchar(max)");

                    b.Property<short?>("ChangePasswordAfterDays")
                        .HasColumnType("smallint");

                    b.Property<Guid>("CreatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedIP")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<short>("ExtendChangePasswordDays")
                        .HasColumnType("smallint");

                    b.Property<int>("FK_CompanyID")
                        .HasColumnType("int");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<bool>("IsActived")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsLock")
                        .HasColumnType("bit");

                    b.Property<bool?>("IsWeakPassword")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("KeepWeakPasswordDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastLoginDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastPasswordChanged")
                        .HasColumnType("datetime2");

                    b.Property<byte?>("LockLevel")
                        .HasColumnType("tinyint");

                    b.Property<string>("LoginType")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<short>("RequiredChangePasswordDays")
                        .HasColumnType("smallint");

                    b.Property<Guid?>("SuperiorSaleID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UpdatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("UpdatedIP")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("UseSecurityCodeSMS")
                        .HasColumnType("bit");

                    b.Property<string>("UserNameLower")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte>("UserType")
                        .HasColumnType("tinyint");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("UsernameBAP")
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.HasKey("PK_UserID");

                    b.ToTable("Admin.Users", "dbo");
                });

            modelBuilder.Entity("API.Entities.AdminUserVehicleGroup", b =>
                {
                    b.Property<Guid>("FK_UserID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("FK_VehicleGroupID")
                        .HasColumnType("int");

                    b.Property<Guid?>("CreatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int?>("ParentVehicleGroupID")
                        .HasColumnType("int");

                    b.Property<Guid?>("UpdateByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("UpdatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("FK_UserID", "FK_VehicleGroupID");

                    b.ToTable("Admin.UserVehicleGroup", "dbo");
                });

            modelBuilder.Entity("API.Entities.VehicleGroup", b =>
                {
                    b.Property<int>("PK_VehicleGroupID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PK_VehicleGroupID"));

                    b.Property<Guid?>("CreatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<double?>("DistanceA")
                        .HasColumnType("float");

                    b.Property<double?>("DistanceB")
                        .HasColumnType("float");

                    b.Property<int?>("FK_BGTProvinceID")
                        .HasColumnType("int");

                    b.Property<int>("FK_CompanyID")
                        .HasColumnType("int");

                    b.Property<int>("Flag")
                        .HasColumnType("int");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int?>("MinuteA")
                        .HasColumnType("int");

                    b.Property<int?>("MinuteB")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<int?>("ParentVehicleGroupID")
                        .HasColumnType("int");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.Property<Guid?>("UpdatedByUser")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PK_VehicleGroupID");

                    b.ToTable("Vehicle.Groups", "dbo");
                });
#pragma warning restore 612, 618
        }
    }
}
