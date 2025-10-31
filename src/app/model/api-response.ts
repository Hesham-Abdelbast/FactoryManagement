export interface ApiResponse<T> {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  success: boolean;
  returnCode: string;
  returnMsg: string;
  data: T|null;
}