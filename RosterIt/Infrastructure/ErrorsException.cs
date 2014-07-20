using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Infrastructure
{
    public class ErrorsException : Exception
    {
        private readonly List<string> _errors;

        public ErrorsException(IEnumerable<string> errors)
        {
            _errors = new List<string>(errors);
        }

        public IEnumerable<string> Reasons
        {
            get
            {
                return _errors;
            }
        }

    }
}