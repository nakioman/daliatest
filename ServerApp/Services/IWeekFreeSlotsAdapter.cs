using System;
using System.Threading;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.Services
{
    public interface IWeekFreeSlotsAdapter
    {
        Task<WeekSchedule> GetWeekFreeSlotsAsync(DateTime date, CancellationToken cancellationToken);
    }
}