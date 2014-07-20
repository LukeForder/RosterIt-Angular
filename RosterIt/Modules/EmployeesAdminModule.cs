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

namespace RosterIt.Modules
{
    public class EmployeesAdminModule : NancyModule
    {
         private readonly ICompanyUnitOfWork _unitOfWork;
         private readonly IEmployeeValidatorFactory _employeeValidatorFactory;

        public EmployeesAdminModule(
            ICompanyUnitOfWork unitOfWork,
            IEmployeeValidatorFactory employeeValidatorFactory
            )
        {
            _unitOfWork = unitOfWork;
            _employeeValidatorFactory = employeeValidatorFactory;

            Post["api/admin/employees", true] = (args, ct) => OnCreateEmployee();
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