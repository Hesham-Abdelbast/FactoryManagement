export interface MerchantFinanceDto {
    id: string;
  merchantId: string;
  amount: number;
  operationDate: string;
  notes?: string | null;
}
