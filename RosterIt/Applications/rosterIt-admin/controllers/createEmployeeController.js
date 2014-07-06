var rosterIt;
(function (rosterIt) {
    (function (admin) {
        (function (employees) {
            

            var CreateEmployeeController = (function () {
                function CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster) {
                    this.scope = $scope;
                    this.confirmationDialog = confirmationDialog;
                    this.location = $location;
                    this.employeeService = employeeService;
                    this.toaster = toaster;

                    $scope.employee = new admin.Employee(null, null);
                    $scope.sites = [new admin.Site("Site A", "1234"), new admin.Site("Site B", "2345")];
                    $scope.cancelCreation = this.cancelCreation.bind(this);
                    $scope.completeCreation = this.createEmployee.bind(this);
                    $scope.onSiteSelected = this.siteSelected.bind(this);
                }
                CreateEmployeeController.prototype.siteSelected = function (site) {
                    this.scope.employeeDetailsForm.$setDirty();

                    if (this.scope.employee.siteId === site.id) {
                        this.scope.employee.siteId = null;
                    } else {
                        this.scope.employee.siteId = site.id;
                    }
                };

                CreateEmployeeController.prototype.goToEmployees = function () {
                    this.location.path('/employees');
                };

                CreateEmployeeController.prototype.createEmployee = function (employee) {
                    var _this = this;
                    this.toaster.pop('wait', 'Submitting', 'Creating the employee, please be patient');

                    this.employeeService.create(employee).then(function (employee) {
                    }, function (reason) {
                        _this.toaster.pop("error", "Whoops!", reason);
                    });
                };

                CreateEmployeeController.prototype.cancelCreation = function () {
                    var _this = this;
                    if (this.scope.employeeDetailsForm.$dirty) {
                        this.confirmationDialog.showDialog("You are leaving the page!", "There are unsaved changes that have been made to the new employee, if you leave the page these will all be lost. Are you sure you want to continue?").then(function () {
                            _this.goToEmployees();
                        });
                    } else {
                        this.goToEmployees();
                    }
                };
                return CreateEmployeeController;
            })();

            // register the controller
            admin.Module.controller('createEmployeeController', ['$scope', 'confirmationDialog', 'employeeService', '$location', 'toaster', function ($scope, confirmationDialog, employeeService, $location, toaster) {
                    return new CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster);
                }]);
        })(admin.employees || (admin.employees = {}));
        var employees = admin.employees;
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=CreateEmployeeController.js.map
