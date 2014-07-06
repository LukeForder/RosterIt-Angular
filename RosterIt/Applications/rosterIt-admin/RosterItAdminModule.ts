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
                        when('/employees/create',
                        {
                            controller: 'createEmployeeController',
                            templateUrl: '../applications/rosterIt-admin/views/create-employee-controller.html'
                        }
                        )
                        .otherwise({

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
            ]);






























}