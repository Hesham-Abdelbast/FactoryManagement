export interface MerchantExpenseCreateDto {
     merchantId: string;
  amount: number;
  notes: string;
  expenseDate?: string;
}
