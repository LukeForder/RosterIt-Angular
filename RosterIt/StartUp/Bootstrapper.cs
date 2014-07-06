using Nancy.Bootstrappers.Ninject;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Ninject;
using RosterIt.Contexts.Company.Data.Interfaces;
using RosterIt.Contexts.Company.Data;
using Nancy.Conventions;

namespace RosterIt.StartUp
{
    public class Bootstrapper : NinjectNancyBootstrapper
    {
        protected override void ConfigureApplicationContainer(Ninject.IKernel existingContainer)
        {
            base.ConfigureApplicationContainer(existingContainer);
        }

        protected override void ConfigureRequestContainer(Ninject.IKernel container, Nancy.NancyContext context)
        {
            base.ConfigureRequestContainer(container, context);

            new CompanyContextRegistrar().Register(container);
        }

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Scripts", allowedExtensions: "js"));
            conventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("Applications", allowedExtensions: new string[] { "js", "html" }));
        }
    }
}