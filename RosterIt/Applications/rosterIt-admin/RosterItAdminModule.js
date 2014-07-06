var rosterIt;
(function (rosterIt) {
    (function (admin) {
        admin.Module = angular.module('rosterItAdministration', [
            'ngRoute',
            'ui.bootstrap',
            'ngProgressLite',
            'toaster'
        ], function () {
        }).config([
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider.when('/employees/create', {
                    controller: 'createEmployeeController',
                    templateUrl: '../applications/rosterIt-admin/views/create-employee-controller.html'
                }).otherwise({});
            }
        ]).factory('confirmationDialog', [
            '$modal',
            function ($modal) {
                return new rosterIt.dialogs.ConfirmationDialog($modal);
            }
        ]).factory('showProgressInterceptor', [
            '$q',
            'ngProgressLite',
            function ($q, ngProgressLite) {
                return new rosterIt.ShowProgressInterceptor($q, ngProgressLite);
            }
        ]).config([
            '$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('showProgressInterceptor');
            }
        ]).config([
            'toasterConfig',
            function (toasterConfig) {
                toasterConfig.limit = 1;
            }
        ]);
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=RosterItAdminModule.js.map
