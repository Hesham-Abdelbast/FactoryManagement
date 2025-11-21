import { PaginationEntity } from "../pagination-entity";

export interface TxnSearchDto extends PaginationEntity {
  fromDate?: Date | string;
  toDate?: Date | string;
  merchantName?: string;
  materialTypeName?: string;
  warehouseeName?: string;
  isUnPaid?: boolean;
  isPaid?: boolean;
  pageSize:number;
  pageIndex:number;
  totalCount:number;
}