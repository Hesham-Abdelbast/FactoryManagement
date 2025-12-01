export interface DriverExpenseDto {
    id: string;
  driverId: string;
  amount: number;
  notes?: string;
  expenseDate: Date;
}
