using System;
using System.Collections.Generic;
using System.Linq;

namespace ServerApp.Models.Api
{
    public class DaySlots
    {
        public WorkPeriod WorkPeriod { get; set; }
        public IEnumerable<BusySlot> BusySlots { get; set; }

        public bool IsInLunchPeriod(DateTime start, DateTime end)
        {
            var lunchStart = new DateTime(start.Year, start.Month, start.Day, WorkPeriod.LunchStartHour, 0, 0);
            var lunchEnd = new DateTime(end.Year, end.Month, end.Day, WorkPeriod.LunchEndHour, 0, 0);
            return (start >= lunchStart && end <= lunchEnd) || (start < lunchEnd && end > lunchStart);
        }

        public bool IsSlotBusy(DateTime start, DateTime end)
        {
            return BusySlots?.Any(slot => slot.Start >= start && slot.End <= end) ?? false;
        }
    }
}