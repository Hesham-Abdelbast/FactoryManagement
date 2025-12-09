import { EmployeeCashAdvanceDto } from "./employee-cash-advance-dto";
import { EmployeeDto } from "./employee-dto";
import { EmployeeMonthlyPayrollDto } from "./employee-monthly-payroll-dto";
import { EmployeePersonalExpenseDto } from "./employee-personal-expense-dto";

export interface FullFinancialResponseDto {
totalNumberOfWorkDays: number;
  employee: EmployeeDto;

  cashAdvances?: EmployeeCashAdvanceDto[];
  totalCashAdvances: number;

  personalExpenses?: EmployeePersonalExpenseDto[];
  totalPersonalExpenses: number;

  monthlyPayrolls?: EmployeeMonthlyPayrollDto[];
}
