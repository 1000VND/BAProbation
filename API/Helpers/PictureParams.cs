namespace API.Helpers
{
    public class PictureParams : PaginationParams
    {
        public required string VehicleName { get; set; }
        public required List<int> Channels { get; set; }
        public int OrderBy { get; set; } = 0; // 0: Tăng dần, 1: Giảm dần
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
