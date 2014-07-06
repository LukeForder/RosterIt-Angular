var rosterIt;
(function (rosterIt) {
    var ShowProgressInterceptor = (function () {
        function ShowProgressInterceptor($q, ngProgressLite) {
            this.progress = ngProgressLite;
            this.$q = $q;
            this.request = this.onRequest.bind(this);
            this.response = this.onResponse.bind(this);
            this.requestError = this.onRequestError.bind(this);
            this.responseError = this.onResponseError.bind(this);
        }
        ShowProgressInterceptor.prototype.onRequest = function (config) {
            this.progress.start();
            return config;
        };

        ShowProgressInterceptor.prototype.onRequestError = function (rejection) {
            this.progress.done();
            return this.$q.reject(rejection);
        };

        ShowProgressInterceptor.prototype.onResponse = function (response) {
            this.progress.done();
            return response;
        };

        ShowProgressInterceptor.prototype.onResponseError = function (rejection) {
            this.progress.done();
            return this.$q.reject(rejection);
        };
        return ShowProgressInterceptor;
    })();
    rosterIt.ShowProgressInterceptor = ShowProgressInterceptor;
})(rosterIt || (rosterIt = {}));
//# sourceMappingURL=ShowProgressInterceptor.js.map
