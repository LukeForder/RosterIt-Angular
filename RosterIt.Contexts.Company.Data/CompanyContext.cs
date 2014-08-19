using RosterIt.Contexts.Company.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company.Data
{
    public class CompanyContext : DbContext, Interfaces.ICompanyQueryContext, Interfaces.ICompanyUnitOfWork
    {
        public CompanyContext(
            DbConnection connection)
            : base(connection, true)
        {
            _transactionContext = connection.BeginTransaction();

            Database.UseTransaction(_transactionContext);
        }

        private readonly DbTransaction _transactionContext;
        private bool _rolledBack = false;

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Site>()
                .Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            modelBuilder
                .Entity<Employee>()
                .Property(x => x.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
        }


        protected override void Dispose(bool disposing)
        {
            if (!_rolledBack)
            {
                try
                {
                    _transactionContext.Commit();
                }
                catch (Exception exception)
                {
                }
            }

            base.Dispose(disposing);
        }

        public async Task Commit()
        {
            await SaveChangesAsync();

            _transactionContext.Commit();
        }

        public void Rollback()
        {
            _rolledBack = true;
            _transactionContext.Rollback();
        }

        private DbSet<Site> SiteSet
        {
            get
            {
                return Set<Site>();
            }
        }

        private DbSet<Employee> EmployeeSet
        {
            get
            {
                return Set<Employee>();
            }
        }

        void ICompanyUnitOfWork.AddSites(IEnumerable<Site> sites)
        {
            foreach (var site in sites)
            {
                if (site.Id == Guid.Empty)
                {
                    site.Id = Guid.NewGuid();
                }
            }

           SiteSet.AddRange(sites);
        }

        private void RemoveSites(IEnumerable<Site> sites)
        {
            SiteSet.RemoveRange(sites);
        }

        void ICompanyUnitOfWork.RemoveSites(IEnumerable<Site> sites)
        {
            RemoveSites(sites);
        }

        void ICompanyUnitOfWork.RemoveSites(IEnumerable<Guid> siteIds)
        {

            var sites =
                siteIds
                    .Select(id => new Site { Id = id })
                    .ToArray();

            RemoveSites(sites);
        }

        void ICompanyUnitOfWork.AddEmployees(IEnumerable<Employee> employees)
        {
            foreach (var employee in employees)
            {
                if (employee.Id == Guid.Empty)
                {
                    employee.Id = Guid.NewGuid();
                }
            }

            EmployeeSet.AddRange(employees);
        }

        private async Task RemoveEmployees(IEnumerable<Guid> employeeIds)
        {
            IList<Employee> employees = 
                await EmployeeSet
                .Where(x => employeeIds.Contains(x.Id))
                .ToListAsync();

            EmployeeSet.RemoveRange(employees);
        }

        async Task ICompanyUnitOfWork.RemoveEmployees(IEnumerable<Employee> employees)
        {
            await RemoveEmployees(employees.Select(x => x.Id).ToArray());
        }

        async Task ICompanyUnitOfWork.RemoveEmployees(IEnumerable<Guid> employeeIds)
        {
            await RemoveEmployees(employeeIds);
        }

        IQueryable<Site> Interfaces.ICompanyQueryContext.Sites
        {
            get
            {
                return SiteSet;
            }
        }

        IQueryable<Employee> Interfaces.ICompanyQueryContext.Employees
        {
            get
            {
                return EmployeeSet;
            }
        }
    }
}
