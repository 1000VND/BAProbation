namespace API.Helpers
{
    public class PictureParams : PaginationParams
    {
        public int CustomerId { get; set; }
        public required string VehicleName { get; set; }
        public List<int>? Channels { get; set; }
        public int OrderBy { get; set; } // 1: Ảnh mới nhất, 2: Ảnh cũ nhất
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
