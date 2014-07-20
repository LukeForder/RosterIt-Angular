module rosterIt.admin {

    export var Module =
        angular.
            module(
            'rosterItAdministration',
            [
                'ngRoute',
                'ui.bootstrap',
                'ngProgressLite',
                'toaster'
            ],
            function () { }).
            config(
            [
                '$routeProvider',
                function ($routeProvider) {
                    $routeProvider.
                        when('/employees',
                        {
                            controller: 'employeeListController',
                            templateUrl: '../applications/rosterIt-admin/views/employee-list-controller.html'
                        }).
                        when('/employees/create',
                        {
                            controller: 'createEmployeeController',
                            templateUrl: '../applications/rosterIt-admin/views/create-employee-controller.html'
                        }).
                        when('/sites/create',
                        {
                            controller: 'createSiteController',
                            templateUrl: '../applications/rosterIt-admin/views/create-site-controller.html'
                        }).
                        otherwise({

                        });
                }
            ]).
            factory(
            'confirmationDialog',
            [
                '$modal',
                ($modal: ng.ui.bootstrap.IModalService) => new dialogs.ConfirmationDialog($modal)
            ]).
            factory(
            'showProgressInterceptor',
            [
                '$q',
                'ngProgressLite',
                ($q: ng.IQService, ngProgressLite: ng.progressLite.INgProgressLite) => new ShowProgressInterceptor($q, ngProgressLite)
            ]).
            config(
            [
                '$httpProvider',
                function ($httpProvider) {
                    $httpProvider.interceptors.push('showProgressInterceptor');
                }
            ]).
            config([
                'toasterConfig',
                (toasterConfig: angularjs.toaster.IConfigurationOptions) => {
                    toasterConfig.limit = 1;
                }
            ]).
            factory(
                'siteService',
                [
                '$q',
                '$http',
                ($q, $http) => new admin.SiteService($q, $http)
                ]
            ).
            controller(
            'createSiteController',
            [
                '$scope',
                'siteService',
                'toaster',
                'confirmationDialog',
                '$location',
                ($scope, siteService, toaster, confirmationDialog, $location) =>
                    new rosterIt.admin.site.CreateSiteController($scope, siteService, toaster, confirmationDialog, $location)
            ]).
            controller(
            'employeeListController',
            [
                '$scope',
                'employeeService',
                'confirmationDialog',
                'toaster',
                '$location',
                ($scope, employeeService, confirmationDialog, toaster, $location) => new
                    rosterIt.admin.employees.EmployeeListController($scope, employeeService, confirmationDialog, toaster, $location)
            ]);






























}