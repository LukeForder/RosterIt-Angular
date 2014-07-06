var rosterIt;
(function (rosterIt) {
    (function (admin) {
        /*
        Represents a locations where employees work.
        */
        var Site = (function () {
            function Site(name, id) {
                this.name = name;
                this.id = id;
            }
            return Site;
        })();
        admin.Site = Site;
    })(rosterIt.admin || (rosterIt.admin = {}));
    var admin = rosterIt.admin;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=Site.js.map
