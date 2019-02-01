namespace ServerApp.Models.Api
{
    public class AvailabilityWeek
    {
        public Facility Facility { get; set; }
        public int SlotDurationMinutes { get; set; }
        public DaySlots Monday { get; set; }
        public DaySlots Tuesday { get; set; }
        public DaySlots Wednesday { get; set; }
        public DaySlots Thursday { get; set; }
        public DaySlots Friday { get; set; }
        public DaySlots Saturday { get; set; }
        public DaySlots Sunday { get; set; }
    }
}