using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RosterIt.Contexts.Company.Validation
{
    public interface ISiteValidatorFactory 
    {
        IValidator<Site> CreateValidator();
    }
}
