import { Component, Inject } from '@angular/core';
import { EmployeeCashAdvanceDto } from '../../../../model/Employee/employee-cash-advance-dto';
import { EmployeePersonalExpenseDto } from '../../../../model/Employee/employee-personal-expense-dto';
import { EmployeeMonthlyPayrollDto } from '../../../../model/Employee/employee-monthly-payroll-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FullFinancialResponseDto } from '../../../../model/Employee/full-financial-response-dto';
import { TypeOfCash } from '../../../../model/Enums/type-of-cash';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { CommonService } from '../../../../core/common-service';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';
import { ToastService } from '../../../../core/shared/toast.service';

@Component({
  selector: 'app-end-of-work',
  templateUrl: './end-of-work-component.html',
  styleUrls: ['./end-of-work-component.scss'],
  imports: [CommonModule, HModalComponent]
})
export class EndOfWorkComponent {
  financialData!: FullFinancialResponseDto;

  constructor(
    private dialogRef: MatDialogRef<EndOfWorkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonService: CommonService,
    private employeeService: EmployeeManagementService,
    private toast: ToastService

  ) { this.financialData = data?.result; }
  // Arabic month names
  monthNamesAr = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  ngOnInit() {
    // Initialize data if needed
    if (!this.financialData.cashAdvances) {
      this.financialData.cashAdvances = [];
    }
    if (!this.financialData.personalExpenses) {
      this.financialData.personalExpenses = [];
    }
    if (!this.financialData.monthlyPayrolls) {
      this.financialData.monthlyPayrolls = [];
    }
  }

  // Format date for Arabic display
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Format as DD/MM/YYYY which is common in Arabic countries
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  // Get Arabic month name from number
  getMonthNameAr(month: number): string {
    return this.monthNamesAr[month - 1] || '';
  }
  // Get type of cash in Arabic
  getTypeOfCashAr(type: TypeOfCash): string {
    const typeMap: { [key in TypeOfCash]?: string } = {
      [TypeOfCash.CashAdvance]: 'سلفة نقدية',
      [TypeOfCash.Salary]: ' راتب شهري',
    };
    return typeMap[type] || 'غير معروف';
  }

  // Get type of cash in English (if needed)
  getTypeOfCash(type: TypeOfCash): string {
    return TypeOfCash[type] || type.toString();
  }

  // Calculate grand totals
  getGrandTotal(): number {
    const payrollTotal = this.financialData.monthlyPayrolls?.reduce((sum, payroll) => 
      sum + payroll.baseSalary, 0) || 0;
    
    return payrollTotal - this.financialData.totalCashAdvances - this.financialData.totalPersonalExpenses;
  }
  colse(): void {
    this.dialogRef.close();
  }

  confirmEndOfWork(): void {
    this.employeeService.EndWorkEmployee(this.financialData.employee.id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('تم إنهاء عمل الموظف بنجاح.');
            this.dialogRef.close(true);
          } else {
            this.toast.error('فشل في إنهاء عمل الموظف.');
          }
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'حدث خطأ أثناء إنهاء عمل الموظف');
        }
      });
  }
}
