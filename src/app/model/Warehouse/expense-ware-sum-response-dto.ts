import { WarehouseExpenseDto } from "./warehouse-expense-dto";

export interface ExpenseWareSumResponseDto {
    totalExpense: number;
  totalRecords: number;
  details?: WarehouseExpenseDto[];
}
