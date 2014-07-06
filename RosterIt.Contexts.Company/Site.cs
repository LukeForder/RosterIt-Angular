using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RosterIt.Contexts.Company
{
    public class Site
    {
        public Site()
        {
        }

        public Guid Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

        public ICollection<Employee> Employees
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
