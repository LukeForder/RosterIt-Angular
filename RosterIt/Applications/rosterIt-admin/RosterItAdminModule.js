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
                $routeProvider.when('/employees', {
                    controller: 'employeeListController',
                    templateUrl: '../applications/rosterIt-admin/views/employee-list-controller.html'
                }).when('/employees/create', {
                    controller: 'createEmployeeController',
                    templateUrl: '../applications/rosterIt-admin/views/create-employee-controller.html'
                }).when('/sites/create', {
                    controller: 'createSiteController',
                    templateUrl: '../applications/rosterIt-admin/views/create-site-controller.html'
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
        ]).factory('siteService', [
            '$q',
            '$http',
            function ($q, $http) {
                return new admin.SiteService($q, $http);
            }
        ]).controller('createSiteController', [
            '$scope',
            'siteService',
            'toaster',
            'confirmationDialog',
            '$location',
            function ($scope, siteService, toaster, confirmationDialog, $location) {
                return new rosterIt.admin.site.CreateSiteController($scope, siteService, toaster, confirmationDialog, $location);
            }
        ]).controller('employeeListController', [
            '$scope',
            'employeeService',
            'confirmationDialog',
            'toaster',
            '$location',
            function ($scope, employeeService, confirmationDialog, toaster, $location) {
                return new rosterIt.admin.employees.EmployeeListController($scope, employeeService, confirmationDialog, toaster, $location);
            }
        ]);
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=RosterItAdminModule.js.map
