'use strict'
module rosterIt.admin {
    export class SiteService {

        _q: ng.IQService;
        _http: ng.IHttpService;

        constructor(
            $q: ng.IQService,
            $http: ng.IHttpService) {
            this._q = $q;
            this._http = $http;
        }

        get(page: number, count : number): ng.IPromise<ResultSet<Site>> {
            var task = this._q.defer();

            this._http.get(
                '/api/admin/sites/' + encodeURIComponent(page.toString()) + '/' + encodeURIComponent(count.toString()),
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(
                (data: ResultSet<Site>) => {
                    task.resolve(data);
                }
                ).error((reason: any) => {
                    task.reject(reason);
                });

            
            return task.promise;
        }

        delete(site: Site): ng.IPromise<any> {
            throw new Error("Method not implemented.");
        }

        create(site: Site): ng.IPromise<Site> {
            var task = this._q.defer();

            this._http.post(
                '/api/admin/sites',                 
                site,                
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(
                (data: Site) => {
                    task.resolve(data);
                }
                ).error((reason: any) => {
                    task.reject(reason);
                });


            return task.promise;
        }

        update(site: Site): ng.IPromise<Site> {
            throw new Error("Method not implemented.");
        }
    }
}
