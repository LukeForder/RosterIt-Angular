/// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
module rosterIt.dialogs {

    interface ConfirmationDialogScope extends ng.IScope {
        title: string;
        message: string;
        ok: () => void;
        cancel: () => void
       
    }

    export class ConfirmationDialog {

        private modal: ng.ui.bootstrap.IModalService;

        constructor($modal: ng.ui.bootstrap.IModalService) {
            this.modal = $modal;
        }

        public showDialog(
            title: string,
            message: string) : ng.IPromise<any> {

            return this.modal.open({
                    controller: ($scope: ConfirmationDialogScope, $modalInstance: ng.ui.bootstrap.IModalServiceInstance) => {
                        $scope.message = message;
                        $scope.title = title;
                        $scope.ok = $modalInstance.close;
                        $scope.cancel = $modalInstance.dismiss;
                    },
                templateUrl: '/Applications/views/confirmation-dialog.html'
                }).result;

        } 

    }

}
