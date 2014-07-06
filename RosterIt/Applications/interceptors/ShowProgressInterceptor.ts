module rosterIt {

    export class ShowProgressInterceptor  {

        progress: ng.progressLite.INgProgressLite;
        $q: ng.IQService;

        request: (config: any) => any;
        requestError: (rejection: any) => any;
        response: (response: any) => any;
        responseError: (rejection: any) => any;

        constructor($q: ng.IQService, ngProgressLite: ng.progressLite.INgProgressLite) {
            this.progress = ngProgressLite;
            this.$q = $q;
            this.request = this.onRequest.bind(this);
            this.response = this.onResponse.bind(this);
            this.requestError = this.onRequestError.bind(this);
            this.responseError = this.onResponseError.bind(this);
        }

        onRequest(config: any): void {
            this.progress.start();
            return config;
        }

        onRequestError(rejection: any): any {
            this.progress.done();
            return this.$q.reject(rejection);
        }

        onResponse(response: any) {
            this.progress.done();
            return response;
        }

        onResponseError(rejection: any) {
            this.progress.done();
            return this.$q.reject(rejection);
        }
    }

} 