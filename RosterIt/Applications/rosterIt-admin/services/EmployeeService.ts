'use strict'
module rosterIt.admin {
    export class EmployeeService {

        http: ng.IHttpService;
        q: ng.IQService;

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.http = $http;
            this.q = $q;
        }

        public create(employee: Employee): ng.IPromise<Employee> {
            var task = this.q.defer();

            this.http.post(
                'api/employee',
                employee,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).success(
                (employee: Employee) => {
                    task.resolve(employee);
                }
                ).error(
                (response: rosterIt.IErrorResponse, status: number) => {
                    console.error({ response: response, status: status });
                    task.reject(response.reason);
                });

            return task.promise;
        }
    }

    Module.factory('employeeService', ['$http','$q', ($http: ng.IHttpService, $q: ng.IQService) => new EmployeeService($http, $q)]);
}