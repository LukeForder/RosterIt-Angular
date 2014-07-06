var rosterIt;
(function (rosterIt) {
    (function (admin) {
        var Employee = (function () {
            function Employee(fullName, companyNumber, version, siteId, id) {
                this.fullName = fullName;
                this.companyNumber = companyNumber;
                this.version = version;
                this.siteId = siteId;
                this.id = id;
            }
            Employee.prototype.isValid = function () {
                return this.companyNumber != null && this.fullName != null;
            };
            return Employee;
        })();
        admin.Employee = Employee;
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=Employee.js.map
