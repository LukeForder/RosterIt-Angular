using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company.Data.Interfaces
{
    public interface ICompanyQueryContext
    {
        IQueryable<Site> Sites
        {
            get;
        }

        IQueryable<Employee> Employees
        {
            get;
        }
    }
}
