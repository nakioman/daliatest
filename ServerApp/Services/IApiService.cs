using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using ServerApp.Models.Api;

namespace ServerApp.Services
{
    public interface IApiService
    {
        Task<AvailabilityWeek> GetWeeklyAvailabilityAsync(DateTime startOfWeek, CancellationToken cancellationToken);
        Task TakeSlot(TakeSlot slot, CancellationToken cancellationToken);
    }
}