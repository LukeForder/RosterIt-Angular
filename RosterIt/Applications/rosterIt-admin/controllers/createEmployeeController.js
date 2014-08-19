var rosterIt;
(function (rosterIt) {
    (function (admin) {
        (function (employees) {
            

            var CreateEmployeeController = (function () {
                function CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster, siteService) {
                    this.scope = $scope;
                    this.confirmationDialog = confirmationDialog;
                    this.location = $location;
                    this.employeeService = employeeService;
                    this.toaster = toaster;
                    this.siteService = siteService;

                    $scope.employee = new admin.Employee(null, null);
                    $scope.sites = new admin.ResultSet();
                    $scope.cancelCreation = this.cancelCreation.bind(this);
                    $scope.completeCreation = this.createEmployee.bind(this);
                    $scope.onSiteSelected = this.siteSelected.bind(this);

                    this.loadSites(0);
                }
                CreateEmployeeController.prototype.siteSelected = function (site) {
                    this.scope.employeeDetailsForm.$setDirty();

                    if (this.scope.employee.siteId === site.id) {
                        this.scope.employee.siteId = null;
                    } else {
                        this.scope.employee.siteId = site.id;
                    }
                };

                CreateEmployeeController.prototype.loadSites = function (page) {
                    var _this = this;
                    this.scope.loadingSites = true;
                    this.siteService.get(page, 10).then(function (sites) {
                        _this.scope.sites = sites;
                    }).finally(function () {
                        _this.scope.loadingSites = false;
                    });
                };

                CreateEmployeeController.prototype.goToEmployees = function () {
                    this.location.path('/employees');
                };

                CreateEmployeeController.prototype.createEmployee = function (employee) {
                    var _this = this;
                    this.toaster.pop('wait', 'Submitting', 'Creating the employee, please be patient');

                    this.employeeService.create(employee).then(function (employee) {
                        _this.scope.employee = new admin.Employee(null, null);
                        _this.toaster.pop('success', 'Success!', 'Employee, "' + employee.companyNumber + '" saved to the server.');
                    }, function (reasons) {
                        _this.toaster.pop("error", "Whoops!", "Unable to create the employee because; " + reasons.join(', '));
                    });
                };

                CreateEmployeeController.prototype.cancelCreation = function () {
                    var _this = this;
                    if (this.scope.employeeDetailsForm.$dirty) {
                        this.confirmationDialog.showDialog("You are leaving the page!", "There are unsaved changes, if you leave the page these will all be lost. Are you sure you want to continue?").then(function () {
                            _this.goToEmployees();
                        });
                    } else {
                        this.goToEmployees();
                    }
                };
                return CreateEmployeeController;
            })();

            // register the controller
            admin.Module.controller('createEmployeeController', ['$scope', 'confirmationDialog', 'employeeService', '$location', 'toaster', 'siteService', function ($scope, confirmationDialog, employeeService, $location, toaster, siteService) {
                    return new CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster, siteService);
                }]);
        })(admin.employees || (admin.employees = {}));
        var employees = admin.employees;
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=CreateEmployeeController.js.map
