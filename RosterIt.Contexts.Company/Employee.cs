using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company
{
    public class Employee
    {
        
        public Guid Id
        {
            get;
            set;
        }

        public string CompanyNumber
        {
            get;
            set;
        }

        public string FullName
        {
            get;
            set;
        }

        public Site Site
        {
            get;
            set;
        }

        public Guid? SiteId
        {
            get;
            set;
        }

        public Guid Version
        {
            get;
            set;
        }
    }
}
