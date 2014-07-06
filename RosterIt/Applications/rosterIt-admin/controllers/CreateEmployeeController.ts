module rosterIt.admin.employees {

    /**
    * 
    */
    interface CreateEmployeeScope extends ng.IScope {
        employee: Employee;
        sites: Site[];
        onSiteSelected: (site: Site) => void;
        cancelCreation: Function;
        completeCreation: Function;
        employeeDetailsForm: ng.IFormController;
        validationErrors: string;
    }

    class CreateEmployeeController  {

        scope: CreateEmployeeScope;
        confirmationDialog: dialogs.ConfirmationDialog;

        private location: ng.ILocationService;
        private employeeService: EmployeeService;

        private toaster: angularjs.toaster.IToaster;

        constructor($scope: CreateEmployeeScope, confirmationDialog: dialogs.ConfirmationDialog, employeeService: rosterIt.admin.EmployeeService, $location: ng.ILocationService, toaster: angularjs.toaster.IToaster) {
            this.scope = $scope;
            this.confirmationDialog = confirmationDialog;
            this.location = $location;
            this.employeeService = employeeService;
            this.toaster = toaster;

            $scope.employee = new Employee(null, null);
            $scope.sites = [new Site("Site A", "1234"), new Site("Site B", "2345")];
            $scope.cancelCreation = this.cancelCreation.bind(this);
            $scope.completeCreation = this.createEmployee.bind(this);
            $scope.onSiteSelected = this.siteSelected.bind(this);
        }
                
        siteSelected(site: Site) : void {
            this.scope.employeeDetailsForm.$setDirty();

            if (this.scope.employee.siteId === site.id) {
                this.scope.employee.siteId = null;
            }
            else {
                this.scope.employee.siteId = site.id;
            }
        }
        

        goToEmployees() {
            this.location.path('/employees');
        }

        createEmployee(employee: Employee): void {
            this.toaster.pop('wait', 'Submitting', 'Creating the employee, please be patient');

            this.employeeService.create(employee).then(
                (employee: Employee) => {

                },
                (reason: string) => {
                    this.toaster.pop("error", "Whoops!", reason);
                });
        }

        cancelCreation() {
            if (this.scope.employeeDetailsForm.$dirty) {
                this.confirmationDialog.showDialog(
                    "You are leaving the page!",
                    "There are unsaved changes that have been made to the new employee, if you leave the page these will all be lost. Are you sure you want to continue?")
                .then(
                    () => {
                        this.goToEmployees();
                    });
            }
            else {
                this.goToEmployees();
            }
        }

    }



    // register the controller
    Module.controller('createEmployeeController', ['$scope', 'confirmationDialog', 'employeeService', '$location', 'toaster', ($scope: CreateEmployeeScope, confirmationDialog: dialogs.ConfirmationDialog, employeeService: rosterIt.admin.EmployeeService, $location: ng.ILocationService, toaster: angularjs.toaster.IToaster) => new CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster)]);
}
