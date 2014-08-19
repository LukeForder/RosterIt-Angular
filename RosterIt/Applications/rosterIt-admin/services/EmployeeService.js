'use strict';
var rosterIt;
(function (rosterIt) {
    (function (admin) {
        var EmployeeService = (function () {
            function EmployeeService($http, $q) {
                this.http = $http;
                this.q = $q;
            }
            EmployeeService.prototype.search = function (searchTerm) {
                var task = this.q.defer();

                this.http.get('/api/admin/employees' + (searchTerm ? ('?q=' + encodeURIComponent(searchTerm)) : ''), {
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).success(function (employees) {
                    task.resolve(employees);
                }).error(function (response, status) {
                    console.error({ response: response, status: status });
                    task.reject(response);
                });

                return task.promise;
            };

            EmployeeService.prototype.delete = function (employee) {
                var task = this.q.defer();

                this.http.delete('/api/admin/employees/' + encodeURIComponent(employee.id), {
                    headers: {
                        "Accept": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    }
                }).success(function () {
                    task.resolve();
                }).error(function (response, status) {
                    console.error({ response: response, status: status });
                    task.reject(response);
                });

                return task.promise;
            };

            EmployeeService.prototype.create = function (employee) {
                var task = this.q.defer();

                this.http.post('/api/admin/employees', employee, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).success(function (employee) {
                    task.resolve(employee);
                }).error(function (response, status) {
                    console.error({ response: response, status: status });
                    task.reject(response);
                });

                return task.promise;
            };
            return EmployeeService;
        })();
        admin.EmployeeService = EmployeeService;

        admin.Module.factory('employeeService', ['$http', '$q', function ($http, $q) {
                return new EmployeeService($http, $q);
            }]);
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=EmployeeService.js.map
