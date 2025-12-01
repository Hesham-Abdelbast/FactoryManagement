export interface TrnxReportRequestDto {
    from: Date;
    to: Date;
    warehouseId?: string | null;
    materialCategory?: string | null;
}
