using API.Data;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace API.Services
{
    public class MediaVehicleService : IMediaVehicleService
    {
        public static int CompanyId = 15076;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public MediaVehicleService(
            DataContext context,
            IMapper mapper,
            IConfiguration configuration
            )
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        /// <summary>Lấy danh sách nhóm phương tiện</summary>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/15/2025 created
        /// </Modified>
        public async Task<List<GroupDto>> GetAllGroups()
        {
            try
            {
                var data = await (from g in _context.Groups
                                  join v in _context.VehicleGroups.Where(e => e.IsDeleted == null || e.IsDeleted == false) on g.PK_VehicleGroupID equals v.FK_VehicleGroupID into gv
                                  where (g.IsDeleted == null || g.IsDeleted == false)
                                        && g.FK_CompanyID == CompanyId
                                  select new GroupDto
                                  {
                                      PK_VehicleGroupID = g.PK_VehicleGroupID,
                                      ParentVehicleGroupID = g.ParentVehicleGroupID,
                                      Name = g.Name,
                                      CountVehicle = gv.Count()
                                  }).ToListAsync();

                return data;
            }
            catch (Exception ex)
            {
                throw new Exception($"Có lỗi xảy ra khi lấy nhóm xe: {ex.Message}", ex);
            }

        }

        /// <summary>Lấy danh sách xe nằm trong nhóm phương tiện</summary>
        /// <param name="groupIds">Id của nhóm phương tiện</param>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/15/2025 created
        /// </Modified>
        public async Task<List<VehicleGroupDto>> GetVehicleGroups(List<int> groupIds)
        {
            try
            {
                var result = new List<VehicleGroupDto>();

                var data = await (from g in _context.Groups
                                  join vg in _context.VehicleGroups on g.PK_VehicleGroupID equals vg.FK_VehicleGroupID
                                  join v in _context.Vehicles on vg.FK_VehicleID equals v.PK_VehicleID
                                  where (g.IsDeleted == null || g.IsDeleted == false)
                                     && (vg.IsDeleted == null || vg.IsDeleted == false)
                                     && (v.IsDeleted == null || v.IsDeleted == false)
                                     && (v.IsLocked == null || v.IsLocked == false)
                                     && g.FK_CompanyID == CompanyId && v.FK_CompanyID == CompanyId
                                     && vg.FK_CompanyID == CompanyId
                                     && ((groupIds.Count == 1 && groupIds[0] == 0) || groupIds.Contains(g.PK_VehicleGroupID))
                                  select v).Distinct().ToListAsync();

                foreach (var item in data)
                {
                    var vehicle = new VehicleGroupDto()
                    {
                        VehiclePlate = item.VehiclePlate,
                        PlateAndCode = item.PrivateCode.Equals(item.VehiclePlate)
                                        ? item.PrivateCode : item.PrivateCode + " (" + item.VehiclePlate + ")"
                    };
                    result.Add(vehicle);
                }

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Có lỗi xảy ra khi lấy danh sách xe: {ex.Message}", ex);
            }

        }

        /// <summary>Lấy ảnh của xe</summary>
        /// <param name="pictureParams">Các tham số user nhập</param>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <exception cref="System.Exception">API trả về lấy dữ liệu thất bại
        /// or
        /// Gọi API thất bại: {response.StatusCode}
        /// or
        /// Có lỗi xảy ra khi lấy hình ảnh: {ex.Message}</exception>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/15/2025 created
        /// </Modified>
        public async Task<PagedList<PictureDto>> GetPictures(PictureParams pictureParams)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    // Địa chỉ API
                    var apiUrl = _configuration["BaCamApi"];

                    // Dữ liệu gửi đi
                    var requestBody = new
                    {
                        CustomerId = 7643,
                        VehicleName = pictureParams.VehicleName,
                        Channels = pictureParams.Channels,
                        StartTime = pictureParams.StartTime,
                        EndTime = pictureParams.EndTime,
                        OrderBy = pictureParams.OrderBy,
                        Frequency = 5,
                        StorageTime = 90
                    };

                    // Chuyển dữ liệu thành JSON
                    var jsonContent = new StringContent(
                        JsonSerializer.Serialize(requestBody),
                        Encoding.UTF8,
                        "application/json"
                    );

                    // Gửi request POST
                    var response = await httpClient.PostAsync(apiUrl, jsonContent);

                    // Kiểm tra phản hồi
                    if (response.IsSuccessStatusCode)
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();

                        // Sử dụng Newtonsoft.Json để deserialize vì PictureDto sử dụng JsonProperty từ Newtonsoft
                        var apiResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<ApiBaCamResponse>(responseContent);

                        if (apiResponse != null && apiResponse.IsSuccess)
                        {
                            IEnumerable<PictureDto> orderedData = pictureParams.OrderBy == 2
                                ? apiResponse.Data.AsQueryable().OrderBy(x => x.TimePicture)
                                : apiResponse.Data.AsQueryable().OrderByDescending(x => x.TimePicture);

                            var result = PagedList<PictureDto>.Pagination(orderedData, pictureParams.PageNumber, pictureParams.PageSize);

                            return result;
                        }
                        else
                        {
                            throw new Exception("API trả về lấy dữ liệu thất bại");
                        }
                    }
                    else
                    {
                        throw new Exception($"Gọi API thất bại: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Có lỗi xảy ra khi lấy hình ảnh: {ex.Message}", ex);
            }
        }


    }
}
