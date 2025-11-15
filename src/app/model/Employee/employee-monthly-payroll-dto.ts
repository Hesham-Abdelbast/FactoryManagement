export interface EmployeeMonthlyPayrollDto {
     id: string;
  employeeId: string;
  year: number;
  month: number;
  baseSalary: number;
  personalExpensesTotal: number;
  cashAdvancesTotal: number;
  remaining: number;
}
