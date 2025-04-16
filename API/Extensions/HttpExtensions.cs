using API.Helpers;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        /// <summary>Thêm thông tin của phân trang vào Headers của Response</summary>
        /// <param name="response">Kết quả trả về của request</param>
        /// <param name="header">The header.</param>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/14/2025 created
        /// </Modified>
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Append("Pagination", JsonSerializer.Serialize(header, jsonOptions));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
