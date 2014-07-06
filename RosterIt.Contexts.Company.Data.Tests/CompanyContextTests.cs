using RosterIt.Contexts.Company.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using System.Data.Entity;
using RosterIt.StartUp;
using System.Data.Common;
using Ninject;
using FluentAssertions;

namespace RosterIt.Contexts.Company.Data.Tests
{
    public class CompanyContextTests
    {
        [Fact]
        public async Task CanQueryEmployees()
        {
            Ninject.StandardKernel kernel = new Ninject.StandardKernel();
            
            new CompanyContextRegistrar().Register(kernel);

            ICompanyQueryContext queryContext = kernel.Get<ICompanyQueryContext>();

            await queryContext.Employees.ToListAsync();
        }

        [Fact]
        public async Task CanQuerySites()
        {
            Ninject.StandardKernel kernel = new Ninject.StandardKernel();

            new CompanyContextRegistrar().Register(kernel);

            ICompanyQueryContext queryContext = kernel.Get<ICompanyQueryContext>();

            await queryContext.Sites.ToListAsync();
        }

        [Fact]
        public async Task CanInsertSite()
        {
            Guid testId = Guid.Parse("197fa2cc-9b80-47fd-8692-fe4c709afbf8");

            Ninject.StandardKernel kernel = new Ninject.StandardKernel();

            new CompanyContextRegistrar().Register(kernel);
            
            var connection = kernel.Get<DbConnection>();

            using (var companyContextRaw = new CompanyContext(connection))
            {
                companyContextRaw.Database.CreateIfNotExists();
            }

            connection = kernel.Get<DbConnection>();

            using (var deleteSiteTestCommand = connection.CreateCommand())
            {
                deleteSiteTestCommand.CommandText = "DELETE FROM [Sites] WHERE [Id] = @id";
                deleteSiteTestCommand.CommandType = System.Data.CommandType.Text;

                var siteIdParamenter = deleteSiteTestCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = testId;
                siteIdParamenter.ParameterName = "id";

                deleteSiteTestCommand.Parameters.Add(siteIdParamenter);

                await deleteSiteTestCommand.ExecuteNonQueryAsync();
            }

            ICompanyUnitOfWork unitOfWork = kernel.Get<ICompanyUnitOfWork>();

            unitOfWork.AddSites(
                new Site[]{
                    new Site
                    {
                        Id = testId,
                        Name = "Test::CanInsertSite",
                        Version = Guid.NewGuid()
                    }
                });

            await unitOfWork.Commit();

            int rowsCounted = 0;

            using (var employeeExistsQueryCommand = connection.CreateCommand())
            {
                employeeExistsQueryCommand.CommandType = System.Data.CommandType.Text;
                employeeExistsQueryCommand.CommandText = "SELECT Count(*) FROM [Sites] WHERE [Id] = @id";

                var siteIdParamenter = employeeExistsQueryCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = testId;
                siteIdParamenter.ParameterName = "id";
                    
                employeeExistsQueryCommand.Parameters.Add(siteIdParamenter);

                rowsCounted = (int)( await employeeExistsQueryCommand.ExecuteScalarAsync());
            }

            rowsCounted.Should().Be(1);
            
           
        }


        [Fact]
        public async Task CanInsertEmployeeWithoutSite()
        {
            Guid employeeId = Guid.Parse("5979060b-2641-414d-b618-a9f2f55ded9b");

            Ninject.StandardKernel kernel = new Ninject.StandardKernel();

            new CompanyContextRegistrar().Register(kernel);

            var connection = kernel.Get<DbConnection>();

            using (var companyContextRaw = new CompanyContext(connection))
            {
                companyContextRaw.Database.CreateIfNotExists();
            }

            connection = kernel.Get<DbConnection>();

            using (var deleteSiteTestCommand = connection.CreateCommand())
            {
                deleteSiteTestCommand.CommandText = "DELETE FROM [Employees] WHERE [Id] = @id";
                deleteSiteTestCommand.CommandType = System.Data.CommandType.Text;

                var siteIdParamenter = deleteSiteTestCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = employeeId;
                siteIdParamenter.ParameterName = "id";

                deleteSiteTestCommand.Parameters.Add(siteIdParamenter);

                await deleteSiteTestCommand.ExecuteNonQueryAsync();
            }

            ICompanyUnitOfWork unitOfWork = kernel.Get<ICompanyUnitOfWork>();

            unitOfWork.AddEmployees(
                new Employee[]{
                    new Employee
                    {
                        Id = employeeId,
                        CompanyNumber = "Test::CanInsertEmployeeWithoutSite_CompanyNumber",
                        FullName = "Test::CanInsertEmployeeWithoutSite_FullName",
                        Version = Guid.NewGuid()
                    }
                });

            await unitOfWork.Commit();

            int rowsCounted = 0;

            using (var employeeExistsQueryCommand = connection.CreateCommand())
            {
                employeeExistsQueryCommand.CommandType = System.Data.CommandType.Text;
                employeeExistsQueryCommand.CommandText = "SELECT Count(*) FROM [Employees] WHERE [Id] = @id";

                var siteIdParamenter = employeeExistsQueryCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = employeeId;
                siteIdParamenter.ParameterName = "id";

                employeeExistsQueryCommand.Parameters.Add(siteIdParamenter);

                rowsCounted = (int)(await employeeExistsQueryCommand.ExecuteScalarAsync());
            }

            rowsCounted.Should().Be(1);


        }


        [Fact]
        public async Task CanInsertEmployeeWithSite()
        {
            Guid employeeId = Guid.Parse("cb17dc27-b375-40af-9fad-ab824288297a");
            Guid siteId = Guid.Parse("331d703e-9dcb-4686-845d-3e638264991f");

            #region Setup

            Ninject.StandardKernel kernel = new Ninject.StandardKernel();

            new CompanyContextRegistrar().Register(kernel);

            var connection = kernel.Get<DbConnection>();

            using (var companyContextRaw = new CompanyContext(connection))
            {
                companyContextRaw.Database.CreateIfNotExists();
            }

            connection = kernel.Get<DbConnection>();

            using (var deleteEmployeeTestCommand = connection.CreateCommand())
            {
                deleteEmployeeTestCommand.CommandText = "DELETE FROM [Employees] WHERE [Id] = @id";
                deleteEmployeeTestCommand.CommandType = System.Data.CommandType.Text;

                var siteIdParamenter = deleteEmployeeTestCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = employeeId;
                siteIdParamenter.ParameterName = "id";

                deleteEmployeeTestCommand.Parameters.Add(siteIdParamenter);

                await deleteEmployeeTestCommand.ExecuteNonQueryAsync();
            }

            using (var deleteSiteTestCommand = connection.CreateCommand())
            {
                deleteSiteTestCommand.CommandText = "DELETE FROM [Sites] WHERE [Id] = @id";
                deleteSiteTestCommand.CommandType = System.Data.CommandType.Text;

                var siteIdParamenter = deleteSiteTestCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = siteId;
                siteIdParamenter.ParameterName = "id";

                deleteSiteTestCommand.Parameters.Add(siteIdParamenter);

                await deleteSiteTestCommand.ExecuteNonQueryAsync();
            }

            #endregion

            ICompanyUnitOfWork unitOfWork = kernel.Get<ICompanyUnitOfWork>();
            
            unitOfWork.AddEmployees(
                new Employee[]{
                    new Employee
                    {
                        Id = employeeId,
                        CompanyNumber = "Test::CanInsertEmployeeWithSite_CompanyNumber",
                        FullName = "Test::CanInsertEmployeeWithSite_FullName",
                        Site = new Site  {
                            Id = siteId,
                            Name ="Test::CanInsertEmployeeWithSite_Name",
                            Version = Guid.NewGuid()
                        },
                        Version = Guid.NewGuid()
                    }
                });

            await unitOfWork.Commit();

            #region assertions

            int rowsCounted = 0;

            using (var employeeExistsQueryCommand = connection.CreateCommand())
            {
                employeeExistsQueryCommand.CommandType = System.Data.CommandType.Text;
                employeeExistsQueryCommand.CommandText = "SELECT Count(*) FROM [Employees] WHERE [Id] = @id";

                var siteIdParamenter = employeeExistsQueryCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = employeeId;
                siteIdParamenter.ParameterName = "id";

                employeeExistsQueryCommand.Parameters.Add(siteIdParamenter);

                rowsCounted = (int)(await employeeExistsQueryCommand.ExecuteScalarAsync());
            }

            using (var siteExistsQueryCommand = connection.CreateCommand())
            {
                siteExistsQueryCommand.CommandType = System.Data.CommandType.Text;
                siteExistsQueryCommand.CommandText = "SELECT Count(*) FROM [Sites] WHERE [Id] = @id";

                var siteIdParamenter = siteExistsQueryCommand.CreateParameter();
                siteIdParamenter.DbType = System.Data.DbType.Guid;
                siteIdParamenter.Value = siteId;
                siteIdParamenter.ParameterName = "id";

                siteExistsQueryCommand.Parameters.Add(siteIdParamenter);

                rowsCounted = (int)(await siteExistsQueryCommand.ExecuteScalarAsync());
            }

            rowsCounted.Should().Be(1);

            #endregion

        }
    }
}
