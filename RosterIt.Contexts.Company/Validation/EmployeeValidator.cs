using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company.Validation
{
    public class EmployeeValidator : AbstractValidator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.CompanyNumber)
                .NotEmpty()
                .WithMessage("The employee's company number is required.");

            RuleFor(x => x.Id)
                .NotEqual(Guid.Empty)
                .WithMessage("The employee must be assigned an id");

            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("The employee's full name is required.");
        }
    }
}
