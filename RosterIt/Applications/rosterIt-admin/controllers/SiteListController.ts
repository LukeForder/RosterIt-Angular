module rosterIt.admin.site {

    export interface ISiteListControllerScope {
        sites: Site[];
        delete: (site: Site) => void;
        create: () => void;
        edit: (site: Site) => void;
    }

    export class SiteListController {
        constructor(
            siteService: SiteService) {

        }
    }
}