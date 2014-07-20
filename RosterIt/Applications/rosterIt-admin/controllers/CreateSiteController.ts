module rosterIt.admin.site {

    export interface ICreateSiteScope extends ng.IScope {
        site: Site;
        cancelCreation: () => void;
        completeCreation: () => void;
        isValid: () => boolean;
    }

    export class CreateSiteController {

        _siteService: SiteService;

        constructor(
            $scope: ICreateSiteScope,
            siteService: admin.SiteService,
            toaster: angularjs.toaster.IToaster,
            confirmationDialog: dialogs.ConfirmationDialog,
            $location: ng.ILocationService) {

            this._siteService = siteService;

            $scope.site = new Site(null);

            $scope.cancelCreation = () => {
                confirmationDialog.
                    showDialog('Are you sure?', 'Are you sure that you want to cancel creating this site?').
                        then(() => {
                            $location.path('/sites');
                        });

            };

            $scope.completeCreation = () => {
                this.
                    _siteService.create($scope.site).
                    then(
                        function (site) {

                            toaster.pop('success', 'Success!', 'The site, "' + site.name + '" was created.');
                            $scope.site = new Site(null);
                        },
                        function (error) {
                            toaster.pop('error', 'Whoops', 'An unexpected errror prevented the site from being created.');
                        });
            };

            $scope.isValid = () => {
                return $scope.site.name != null;
            };
        }
    }

}