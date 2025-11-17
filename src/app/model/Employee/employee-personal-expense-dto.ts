export interface EmployeePersonalExpenseDto {
  id: string;
  employeeId: string;
  amount: number;
  note?: string;
  createDate: string
}
