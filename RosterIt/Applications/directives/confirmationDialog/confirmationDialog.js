var rosterIt;
(function (rosterIt) {
    /// <reference path="../../../scripts/typings/angularjs/angular.d.ts" />
    (function (dialogs) {
        var ConfirmationDialog = (function () {
            function ConfirmationDialog($modal) {
                this.modal = $modal;
            }
            ConfirmationDialog.prototype.showDialog = function (title, message) {
                return this.modal.open({
                    controller: function ($scope, $modalInstance) {
                        $scope.message = message;
                        $scope.title = title;
                        $scope.ok = $modalInstance.close;
                        $scope.cancel = $modalInstance.dismiss;
                    },
                    templateUrl: '/Applications/views/confirmation-dialog.html'
                }).result;
            };
            return ConfirmationDialog;
        })();
        dialogs.ConfirmationDialog = ConfirmationDialog;
    })(rosterIt.dialogs || (rosterIt.dialogs = {}));
    var dialogs = rosterIt.dialogs;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=confirmationDialog.js.map
