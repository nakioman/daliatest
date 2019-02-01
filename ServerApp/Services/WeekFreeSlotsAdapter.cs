using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ServerApp.Helpers;
using ServerApp.Models;
using ServerApp.Models.Api;

namespace ServerApp.Services
{
    public class WeekFreeSlotsAdapter : IWeekFreeSlotsAdapter
    {
        private readonly IApiService _apiService;

        public WeekFreeSlotsAdapter(IApiService apiService)
        {
            _apiService = apiService;
        }

        public async Task<WeekSchedule> GetWeekFreeSlotsAsync(DateTime date, CancellationToken cancellationToken)
        {
            var startOfWeek = date.StartOfWeek(DayOfWeek.Monday);
            var result = await _apiService.GetWeeklyAvailabilityAsync(startOfWeek, cancellationToken);

            if (result == null)
            {
                return null;
            }

            var monday = GetDayFreeSlots(startOfWeek, result.SlotDurationMinutes, result.Monday);
            var tuesday = GetDayFreeSlots(startOfWeek.AddDays(1), result.SlotDurationMinutes, result.Tuesday);
            var wednesday = GetDayFreeSlots(startOfWeek.AddDays(2), result.SlotDurationMinutes, result.Wednesday);
            var thursday = GetDayFreeSlots(startOfWeek.AddDays(3), result.SlotDurationMinutes, result.Thursday);
            var friday = GetDayFreeSlots(startOfWeek.AddDays(4), result.SlotDurationMinutes, result.Friday);
            var saturday = GetDayFreeSlots(startOfWeek.AddDays(5), result.SlotDurationMinutes, result.Saturday);
            var sunday = GetDayFreeSlots(startOfWeek.AddDays(6), result.SlotDurationMinutes, result.Sunday);

            return new WeekSchedule
            {
                FacilityId = result.Facility.FacilityId,
                FacilityName = result.Facility.Name,
                FacilityAddress = result.Facility.Address,
                Monday = monday,
                Tuesday = tuesday,
                Wednesday = wednesday,
                Thursday = thursday,
                Friday = friday,
                Saturday = saturday,
                Sunday = sunday
            };
        }

        private static IEnumerable<FreeSlot> GetDayFreeSlots(DateTime startOfDay, int slotDurationMinutes, DaySlots day)
        {
            if (day?.WorkPeriod == null)
            {
                return null;
            }

            var freeSlots = new List<FreeSlot>();

            var slotStart = new DateTime(startOfDay.Year, startOfDay.Month, startOfDay.Day, day.WorkPeriod.StartHour, 0, 0);
            var dayEnd = new DateTime(startOfDay.Year, startOfDay.Month, startOfDay.Day, day.WorkPeriod.EndHour, 0, 0);
            var slotEnd = slotStart.AddMinutes(slotDurationMinutes);

            while (slotEnd <= dayEnd)
            {
                if (!day.IsInLunchPeriod(slotStart, slotEnd) && !day.IsSlotBusy(slotStart, slotEnd))
                {
                    freeSlots.Add(new FreeSlot
                    {
                        StartTime = slotStart,
                        EndTime = slotEnd,
                    });
                }

                slotStart = slotStart.AddMinutes(slotDurationMinutes);
                slotEnd = slotStart.AddMinutes(slotDurationMinutes);
            }

            return freeSlots;
        }
    }
}