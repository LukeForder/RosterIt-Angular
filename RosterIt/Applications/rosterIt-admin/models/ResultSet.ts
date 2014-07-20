module rosterIt.admin {
    export class ResultSet<T> {
        data: T[];
        totalCount: number;
        page: number;
    }
} 