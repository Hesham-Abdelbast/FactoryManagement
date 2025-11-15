export interface MerchantExpenseDto {
    id: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  notes?: string;
  expenseDate: string;
}
