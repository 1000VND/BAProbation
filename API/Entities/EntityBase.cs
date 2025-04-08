namespace API.Entities
{
    public abstract class EntityBase
    {
        public Guid CreatedByUser { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Guid? UpdatedByUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
