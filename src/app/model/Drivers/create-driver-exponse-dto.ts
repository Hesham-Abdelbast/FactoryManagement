export interface CreateDriverExpenseDto {
    id: string;
  driverId: string;
  amount: number;
  notes?: string;
  expenseDate: Date;
}