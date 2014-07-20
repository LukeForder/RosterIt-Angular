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
using FluentValidation;
using FluentValidation.Results;
using System.Data.Entity;

namespace RosterIt.Modules
{
    public class SitesAdminModule : NancyModule
    {
        private readonly ICompanyUnitOfWork _unitOfWork;
        private readonly ISiteValidatorFactory _siteValidatorFactory;
        private readonly ICompanyQueryContext _queryContext;

        public SitesAdminModule(
            ICompanyQueryContext queryContext,
            ICompanyUnitOfWork unitOfWork,
            ISiteValidatorFactory siteValidatorFactory)
        {
            _unitOfWork = unitOfWork;
            _siteValidatorFactory = siteValidatorFactory;
            _queryContext = queryContext;

            Post["api/admin/sites", true] = (args, ct) => OnCreateSite();
            Get["api/admin/sites/{page:int}/{count:int}", true] = (args, ct) => OnListSites((int)args.page, (int)args.count);
        }

        private async Task<dynamic> OnCreateSite()
        {
            Site site = this.Bind<Site>(x => x.Id);

            site.Id = Guid.NewGuid();
            site.Version = Guid.NewGuid();

            IValidator<Site> siteValidator = _siteValidatorFactory.CreateValidator();

            ValidationResult validationResult = siteValidator.Validate(site);

            if (!validationResult.IsValid)
            {
                return
                    Negotiate
                    .WithModel(validationResult.Errors.Select(x => x.ErrorMessage))
                    .WithStatusCode(HttpStatusCode.BadRequest);
            }

            _unitOfWork.AddSites(new Site[] { site });

            await _unitOfWork.Commit();

            return site;
        }

        private async Task<dynamic> OnListSites(int page, int count)
        {
            var sites =
               await
                    _queryContext
                    .Sites
                    .Select(x => 
                        new 
                        {  
                            Id = x.Id, 
                            Name = x.Name, 
                            Version = x.Version 
                        })
                    .OrderBy(x => x.Name)
                    .Skip(page * count)
                    .Take(count)
                    .ToListAsync();

            var totalSites = 
                await 
                    _queryContext
                    .Sites
                    .CountAsync();

            return new
            {
                data = sites,
                totalCount = totalSites,
                page = page
            };
        }

    }
}