using System;

namespace ServerApp.Models.Api
{
    public class TakeSlot
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Comments { get; set; }
        public Patient Patient { get; set; }
    }
}