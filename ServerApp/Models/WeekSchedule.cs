using System.Collections.Generic;

namespace ServerApp.Models
{
    public class WeekSchedule
    {
        public string FacilityId { get; set; }
        public string FacilityName { get; set; }
        public string FacilityAddress { get; set; }
        public IEnumerable<FreeSlot> Monday { get; set; }
        public IEnumerable<FreeSlot> Tuesday { get; set; }
        public IEnumerable<FreeSlot> Wednesday { get; set; }
        public IEnumerable<FreeSlot> Thursday { get; set; }
        public IEnumerable<FreeSlot> Friday { get; set; }
        public IEnumerable<FreeSlot> Saturday { get; set; }
        public IEnumerable<FreeSlot> Sunday { get; set; }
    }
}