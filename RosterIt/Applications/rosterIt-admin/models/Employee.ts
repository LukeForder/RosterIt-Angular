module rosterIt.admin {

    export class Employee {
        constructor(
            public fullName: string,
            public companyNumber: string,
            public version?: any,
            public siteId?: any,
            public id? : any) {
    }

        isValid(): boolean {
            return this.companyNumber != null && this.fullName != null;
        }

    }
    //# sourceMappingURL=employee.js.map

}