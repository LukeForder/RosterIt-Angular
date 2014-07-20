module rosterIt.admin.employees {

    /**
    * 
    */
    interface CreateEmployeeScope extends ng.IScope {
        employee: Employee;
        sites: ResultSet<Site>;
        onSiteSelected: (site: Site) => void;
        cancelCreation: Function;
        completeCreation: Function;
        employeeDetailsForm: ng.IFormController;
        validationErrors: string;
        loadingSites: boolean;
        totalSiteCount: number;
    }

    class CreateEmployeeController  {

        scope: CreateEmployeeScope;
        confirmationDialog: dialogs.ConfirmationDialog;

        private location: ng.ILocationService;
        private employeeService: EmployeeService;
        private siteService: SiteService;
        private toaster: angularjs.toaster.IToaster;

        constructor(
            $scope: CreateEmployeeScope,
            confirmationDialog: dialogs.ConfirmationDialog,
            employeeService: rosterIt.admin.EmployeeService,
            $location: ng.ILocationService,
            toaster: angularjs.toaster.IToaster,
            siteService: admin.SiteService) {

            this.scope = $scope;
            this.confirmationDialog = confirmationDialog;
            this.location = $location;
            this.employeeService = employeeService;
            this.toaster = toaster;
            this.siteService = siteService;

            $scope.employee = new Employee(null, null);
            $scope.sites = new ResultSet<Site>();
            $scope.cancelCreation = this.cancelCreation.bind(this);
            $scope.completeCreation = this.createEmployee.bind(this);
            $scope.onSiteSelected = this.siteSelected.bind(this);

            this.loadSites(0);
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

        loadSites(page: number): void {
            this.scope.loadingSites = true;
            this.
                siteService.
                get(page, 10).
                then(
                (sites: ResultSet<Site>) => {
                    this.scope.sites = sites;
                }).
                finally(
                () => {
                    this.scope.loadingSites = false;
                });
        }

        goToEmployees() {
            this.location.path('/employees');
        }

        createEmployee(employee: Employee): void {
            this.toaster.pop('wait', 'Submitting', 'Creating the employee, please be patient');

            this.employeeService.create(employee).then(
                (employee: Employee) => {
                    this.scope.employee = new Employee(null, null);
                    this.toaster.pop('success', 'Success!', 'Employee, "' + employee.companyNumber + '" saved to the server.');
                },
                (reasons: string[]) => {
                    this.toaster.pop("error", "Whoops!", "Unable to create the employee because; " + reasons.join(', '));
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
    Module.controller('createEmployeeController', ['$scope', 'confirmationDialog', 'employeeService', '$location', 'toaster', 'siteService', ($scope: CreateEmployeeScope, confirmationDialog: dialogs.ConfirmationDialog, employeeService: rosterIt.admin.EmployeeService, $location: ng.ILocationService, toaster: angularjs.toaster.IToaster, siteService: SiteService) => new CreateEmployeeController($scope, confirmationDialog, employeeService, $location, toaster, siteService)]);
}
