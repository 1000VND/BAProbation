using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T>
    {
        /// <summary>Tạo một đối tượng PagedList<T> mới từ danh sách items </summary>
        /// <param name="items">Danh sách các giá trị</param>
        /// <param name="count">Tổng số phần tử</param>
        /// <param name="pageNumber">Số trang hiện tại</param>
        /// <param name="pageSize">Số bản ghi trong trang</param>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/14/2025 created
        /// </Modified>
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        /// <summary>Tạo một PagedList<T> từ IEnumerable<T> </summary>
        /// <param name="source">Dữ liệu</param>
        /// <param name="pageNumber">Trang hiện tại</param>
        /// <param name="pageSize">Số bản ghi trong trang</param>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/14/2025 created
        /// </Modified>
        public static PagedList<T> Pagination(IEnumerable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        /// <summary>Tương tự như hàm trên nhưng được dùng khi lấy dữ liệu từ database server</summary>
        /// <param name="source">Dữ liệu</param>
        /// <param name="pageNumber">Trang hiện tại</param>
        /// <param name="pageSize">Số bản ghi trong trang</param>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <Modified>
        /// Name Date Comments
        /// hunglq 4/15/2025 created
        /// </Modified>
        public static async Task<PagedList<T>> Pagination(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
