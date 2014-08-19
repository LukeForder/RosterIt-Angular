using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company.Data.Interfaces
{
    public interface ICompanyUnitOfWork  : IDisposable
    {
        Task Commit();
        void Rollback();

        void AddSites(IEnumerable<Site> sites);
        void RemoveSites(IEnumerable<Site> sites);
        void RemoveSites(IEnumerable<Guid> siteIds);

        void AddEmployees(IEnumerable<Employee> employees);
        Task RemoveEmployees(IEnumerable<Employee> employees);
        Task RemoveEmployees(IEnumerable<Guid> employeeIds);
    }
}
