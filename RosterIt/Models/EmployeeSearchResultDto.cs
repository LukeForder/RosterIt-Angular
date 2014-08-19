using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Models
{
    public class EmployeeSearchResultDto
    {
        public Guid Id
        {
            get;
            set;
        }

        public string FullName
        {
            get;
            set;
        }

        public string Site
        {
            get;
            set;
        }

        public string CompanyNumber
        {
            get;
            set;
        }
    }
}