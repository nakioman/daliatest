using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerApp.Models;
using ServerApp.Models.Api;
using ServerApp.Services;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IWeekFreeSlotsAdapter _weekFreeSlotsAdapter;
        private readonly IApiService _apiService;

        public ReservationController(IWeekFreeSlotsAdapter weekFreeSlotsAdapter, IApiService apiService)
        {
            _weekFreeSlotsAdapter = weekFreeSlotsAdapter;
            _apiService = apiService;
        }
        
        [HttpGet("week/{date:datetime}", Name = nameof(GetFreeWeekSlots))]
        public async Task<IActionResult> GetFreeWeekSlots([FromRoute] DateTime date, CancellationToken cancellationToken)
        {
            var freeSlots = await _weekFreeSlotsAdapter.GetWeekFreeSlotsAsync(date, cancellationToken);

            return Ok(freeSlots);
        }

        [HttpPost(Name = nameof(TakeSlot))]
        public async Task<IActionResult> TakeSlot([FromBody] TakeSlotRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var slot = new TakeSlot
                {
                    Patient = new Patient
                    {
                        Name = request.PatientName,
                        Email = request.PatientEmail,
                        Phone = request.PatientPhone,
                        SecondName = request.PatientSurname
                    },
                    Start = request.StartTime,
                    End = request.EndTime,
                    Comments = request.Comments
                };

                await _apiService.TakeSlot(slot, cancellationToken);

                return Ok(); //Here should be best to return Created, but I don't have a Get to use a resource Uri
            }
            catch (HttpRequestException)
            {
                return BadRequest();
            }
        }
    }
}
