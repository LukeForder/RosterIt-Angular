'use strict'
module rosterIt.admin {
    export class EmployeeService {

        http: ng.IHttpService;
        q: ng.IQService;

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.http = $http;
            this.q = $q;
        }

        public delete(employee: Employee): ng.IPromise<any> {
            var task = this.q.defer();

            this.http.delete(
                '/api/admin/employees/' + encodeURIComponent(employee.id),
                {
                    headers: {
                        "Accept": "application/json"
                    }
                }).success(
                () => {
                    task.resolve();
                }
                ).error(
                (response: string[], status: number) => {
                    console.error({ response: response, status: status });
                    task.reject(response);
                });

            return task.promise;
        }

        public create(employee: Employee): ng.IPromise<Employee> {
            var task = this.q.defer();

            this.http.post(
                '/api/admin/employees',
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
                (response: string[], status: number) => {
                    console.error({ response: response, status: status });
                    task.reject(response);
                });

            return task.promise;
        }
    }

    Module.factory('employeeService', ['$http','$q', ($http: ng.IHttpService, $q: ng.IQService) => new EmployeeService($http, $q)]);
}