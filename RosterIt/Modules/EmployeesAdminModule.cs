using FluentValidation;
using FluentValidation.Results;
using Nancy;
using RosterIt.Contexts.Company;
using RosterIt.Contexts.Company.Data.Interfaces;
using RosterIt.Contexts.Company.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Nancy.ModelBinding;
using System.Data.Entity;

using Nancy.Security;

namespace RosterIt.Modules
{
    public class EmployeesAdminModule : NancyModule
    {
         private readonly ICompanyUnitOfWork _unitOfWork;
         private readonly IEmployeeValidatorFactory _employeeValidatorFactory;
         private readonly ICompanyQueryContext _queryContext;

        public EmployeesAdminModule(
            ICompanyUnitOfWork unitOfWork,
            ICompanyQueryContext queryContext,
            IEmployeeValidatorFactory employeeValidatorFactory
            )
        {
           // this.RequiresAuthentication();
           // this.RequiresClaims(new string[] {"administrator"});
            
            _unitOfWork = unitOfWork;
            _employeeValidatorFactory = employeeValidatorFactory;
            _queryContext = queryContext;

            Post["api/admin/employees", true] = (args, ct) => OnCreateEmployee();

            Get["api/admin/employees", true] = (args, ct) => OnGetEmployees();

            Delete["api/admin/employees/{id:guid}", true] = (args, ct) => OnDeleteEmployee((Guid)args.id);
        }

        private async Task<dynamic> OnDeleteEmployee(Guid id)
        {
            await _unitOfWork.RemoveEmployees(new Guid[] { id });
            await _unitOfWork.Commit();

            return HttpStatusCode.OK;
        }

        private async Task<dynamic> OnGetEmployees()
        {
            string pageString = Request.Query.p;
            
            int page = 0;
            if (pageString != null && int.TryParse(pageString, out page) && page < 0)
                page = 0;

            string searchTerm = Request.Query.q;

            int entries = 100;

            IQueryable<Employee> employeeQuery = 
                _queryContext
                .Employees
                .OrderBy(x => x.Id)
                .Skip(page * entries)
                .Take(entries);

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                employeeQuery =
                    employeeQuery
                    .Where(x => x.Site.Name.StartsWith(searchTerm) ||  x.FullName.StartsWith(searchTerm) || x.CompanyNumber.StartsWith(searchTerm));
            }

            return
                (await
                    employeeQuery
                    .ToListAsync())
                    .Select(
                        x =>
                            new Models.EmployeeSearchResultDto
                            {
                                Id = x.Id,
                                FullName = x.FullName,
                                Site = x.Site != null ? x.Site.Name : "<none>",
                                CompanyNumber = x.CompanyNumber
                            })
                    .ToList();
        }

        private async Task<dynamic> OnCreateEmployee()
        {
            Employee employee = this.Bind<Employee>(x => x.Id);

            Guid employeeId = Guid.NewGuid();

            employee.Id = employeeId;

            IValidator<Employee> employeeValidator = _employeeValidatorFactory.CreateValidator();

            ValidationResult validationResult = employeeValidator.Validate(employee);

            if (!validationResult.IsValid)
            {
                return
                    Negotiate
                    .WithModel(validationResult.Errors.Select(x => x.ErrorMessage))
                    .WithStatusCode(HttpStatusCode.BadRequest);
            }

            _unitOfWork.AddEmployees(new Employee[] { employee });

            await _unitOfWork.Commit();

            return employee;
        }
    }
}