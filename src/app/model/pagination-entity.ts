export interface PaginationEntity {
    pageSize: number;
    pageIndex: number;
    totalCount: number;
    search?:string
    from?:Date;
    to?:Date;
}
