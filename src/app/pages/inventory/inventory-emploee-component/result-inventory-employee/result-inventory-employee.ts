import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-inventory-employee',
  imports: [],
  templateUrl: './result-inventory-employee.html',
  styleUrl: './result-inventory-employee.scss',
})
export class ResultInventoryEmployee {
   @Input() employeeData: any;

  // Arabic text constants
  readonly arabicText = {
    title: 'ملخص المالية للموظف',
    employeeInfo: 'معلومات الموظف',
    financialSummary: 'ملخص مالي',
    period: 'الفترة',
    from: 'من',
    to: 'إلى',
    baseSalary: 'الراتب الأساسي',
    totalCashAdvances: 'إجمالي السلف النقدية',
    totalPersonalExpenses: 'إجمالي المصروفات الشخصية',
    netSalary: 'صافي الراتب',
    employeeName: 'اسم الموظف',
    employeeId: 'رقم الموظف',
    currency: 'د.ل',
    deductions: 'الخصومات',
    totalDeductions: 'إجمالي الخصومات',
    finalSalary: 'الراتب النهائي'
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Calculate net salary
  get netSalary(): number {
    return this.employeeData.baseSalary - this.totalDeductions;
  }

  // Calculate total deductions
  get totalDeductions(): number {
    return this.employeeData.totalCashAdvances + this.employeeData.totalPersonalExpenses;
  }

  // Format date for Arabic display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Format currency for Arabic
  formatCurrency(amount: number): string {
    return amount.toLocaleString('ar-EG') + ' ' + this.arabicText.currency;
  }

  // Get Arabic text
  get text() {
    return this.arabicText;
  }
  getEmployeeInitial(){}
}
