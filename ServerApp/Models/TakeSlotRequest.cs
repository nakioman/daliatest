using System;
using System.ComponentModel.DataAnnotations;

namespace ServerApp.Models
{
    public class TakeSlotRequest
    {
        public DateTime StartTime { get; set; }
        
        public DateTime EndTime { get; set; }

        public string Comments { get; set; }

        public string PatientName { get; set; }

        public string PatientSurname { get; set; }

        public string PatientEmail { get; set; }

        public string PatientPhone { get; set; }

        public string FacilityId { get; set; }
    }
}