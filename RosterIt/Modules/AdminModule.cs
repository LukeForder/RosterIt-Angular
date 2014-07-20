using Nancy;
using RosterIt.Contexts.Company;
using RosterIt.Contexts.Company.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.ModelBinding;
using System.Threading.Tasks;
using RosterIt.Contexts.Company.Validation;
using FluentValidation;
using FluentValidation.Results;
using RosterIt.Infrastructure;

namespace RosterIt.Modules
{
    public class AdminModule : NancyModule
    {
       
    }
}