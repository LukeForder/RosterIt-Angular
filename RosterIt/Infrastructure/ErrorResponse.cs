using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Infrastructure
{
    public class ErrorResponse
    {
        public IEnumerable<string> Reasons
        {
            get;
            set;
        }
    }
}