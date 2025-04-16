using Newtonsoft.Json;

namespace API.DTOs
{
    public class PictureDto
    {
        [JsonProperty("u")]
        public string? PhotoUrl { get; set; }

        [JsonProperty("c")]
        public DateTime TimePicture { get; set; }

        [JsonProperty("v")]
        public string? VehiclePlate { get; set; }

        [JsonProperty("s")]
        public int VehicleSpeed { get; set; }

        [JsonProperty("k")]
        public int VehicleChannel { get; set; }

        [JsonProperty("n")]
        public string DriverName { get; set; } = "";
    }

    public class ApiBaCamResponse
    {
        public bool IsSuccess { get; set; }
        public List<PictureDto> Data { get; set; } = [];
    }
}
