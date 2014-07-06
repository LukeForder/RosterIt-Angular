using Ninject;
using RosterIt.Contexts.Company.Data;
using RosterIt.Contexts.Company.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Ninject.Web.Common;

namespace RosterIt.StartUp
{
    public class CompanyContextRegistrar
    {
        public void Register(IKernel container)
        {
            container
                .Bind<DbConnection>()
                .ToMethod((ctx) =>
                {
                    var connectionString =
                        ConfigurationManager.ConnectionStrings["RosterIt.CompanyContext"];

                    SqlConnection connection = new SqlConnection(connectionString.ConnectionString);

                    connection.Open();

                    return (DbConnection)connection;
                })
                .InRequestScope();

            var x = container
                .Bind<ICompanyUnitOfWork, ICompanyQueryContext>()
                .To<CompanyContext>()
                .InRequestScope();

            
        }
    }
}