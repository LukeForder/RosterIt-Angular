'use strict';
var rosterIt;
(function (rosterIt) {
    (function (admin) {
        var EmployeeService = (function () {
            function EmployeeService($http, $q) {
                this.http = $http;
                this.q = $q;
            }
            EmployeeService.prototype.create = function (employee) {
                var task = this.q.defer();

                this.http.post('api/employee', employee, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).success(function (employee) {
                    task.resolve(employee);
                }).error(function (response, status) {
                    console.error({ response: response, status: status });
                    task.reject(response.reason);
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
