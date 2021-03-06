﻿module rosterIt.admin.employees {


    export interface IEmployeesListScope {
        employees: Employee[];
        delete: (employee: Employee) => void;
        edit: (employee: Employee) => void;
        create: () => void;
        search: () => void;
        searching: boolean;
        fetchingResult: boolean;
    };

    export class EmployeeListController {

        _confirmationDialog: dialogs.ConfirmationDialog;
        _employeeService: EmployeeService;
        _scope: IEmployeesListScope;
        _toaster: angularjs.toaster.IToaster;
        _location: ng.ILocationService;

        constructor(
            $scope: IEmployeesListScope,
            employeeService: admin.EmployeeService,
            confirmationDialog: dialogs.ConfirmationDialog,
            toaster: angularjs.toaster.IToaster,
            $location: ng.ILocationService) {

            $scope.delete = this.onDelete.bind(this);
            $scope.edit = this.onEdit.bind(this);
            $scope.create = this.onCreate.bind(this);
            $scope.search = this.onSearch.bind(this);

            this._employeeService = employeeService;
            this._confirmationDialog = confirmationDialog;
            this._scope = $scope;
            this._toaster = toaster;
            this._location = $location;
        }

        onSearch(searchTerm: string): void {

            this._scope.fetchingResult = true;
            this._scope.employees = [];
            this._scope.searching = true; 

            this._employeeService.search(searchTerm).
            then(
            (employees) => {
                this._scope.employees = employees;
                this._scope.fetchingResult = false;
            }).
            catch(
                (reason) => this._toaster.pop("error", "whoops!", "Unable to fetch employees due to a server error"));
        }

        removeEmployee(employee: Employee): void {
            var idx = this._scope.employees.indexOf(employee);
            if (idx > -1) {
                this._scope.employees.splice(idx, 1);
            }
        }

        onDelete(employee: Employee): void {
            this._confirmationDialog.showDialog(
                "Delete employee?",
                "You are about to delete employee, '" + employee.companyNumber + "', you can not undo this action. Are you sure you want to continue?").
                then(() => {
                    this.
                        _employeeService.
                        delete(employee).
                        then(
                        () => this.removeEmployee(employee),
                        (reason) => this._toaster.pop("error", "Whoops!", "An unexpected error prevented employee, '" + employee.companyNumber + "' from being deleted."));                        
                });
        }

        onEdit(employee: Employee) : void {
            this._location.path('/employees/' + encodeURIComponent(employee.id));
        }

        onCreate(): void {
            this._location.path('/employees/create');
        }
    }
}