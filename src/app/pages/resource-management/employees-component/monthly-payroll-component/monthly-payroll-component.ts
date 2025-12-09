import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';
import { EmployeeDto } from '../../../../model/Employee/employee-dto';
import { CreatePayrollDto } from '../../../../model/Employee/create-payroll-dto';
import { ToastService } from '../../../../core/shared/toast.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { EmployeeMonthlyPayrollDto } from '../../../../model/Employee/employee-monthly-payroll-dto';
import { ApiResponse } from '../../../../model/api-response';
import { EmployeeCashAdvanceDto } from '../../../../model/Employee/employee-cash-advance-dto';
import { TypeOfCash } from '../../../../model/Enums/type-of-cash';

@Component({
  selector: 'app-monthly-payroll-component',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './monthly-payroll-component.html',
  styleUrl: './monthly-payroll-component.scss',
})
export class MonthlyPayrollComponent {
  form!: FormGroup;
  employees: EmployeeDto[] = [];
  result: EmployeeMonthlyPayrollDto|null = null;
  years: number[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  monthNames: any = {
    1: "يناير",
    2: "فبراير",
    3: "مارس",
    4: "أبريل",
    5: "مايو",
    6: "يونيو",
    7: "يوليو",
    8: "أغسطس",
    9: "سبتمبر",
    10: "أكتوبر",
    11: "نوفمبر",
    12: "ديسمبر"
  };

  startDate!: Date;
  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeeManagementService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<MonthlyPayrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [this.data.Employee.id, Validators.required],
      year: ['', Validators.required],
      month: ['', Validators.required]
    });
    this.startDate = new Date(this.data.Employee.startDate);

    this.loadYears();
    this.filterMonthsOnYearChange();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getAllEmployees().subscribe(res => {
      if (res.success && res.data) {
        this.employees = res.data;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const createPayrollDto: CreatePayrollDto = {
      employeeId: this.form.value.employeeId,
      year: Number(this.form.value.year),
      month: Number(this.form.value.month)
    };

    this.employeesService.CreateMonthlyPayroll(createPayrollDto)
      .subscribe({
        next: (res: ApiResponse<EmployeeMonthlyPayrollDto>) => {
          if (res.success && res.data) {
            this.result = res.data;
            this.cdr.detectChanges();

          } else {
            this.toast.error('فشل إنشاء كشف الراتب');
          }
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'حدث خطأ أثناء إنشاء كشف الراتب');
        }
      });
  }

  payMonthlySalary() {
    if (!this.result) {
      this.toast.error('لا يوجد كشف راتب لصرفه');
      return;
    }

    // Construct a proper date for the payroll month/year (e.g., 1st day of that month)
    const payrollDate = new Date(this.result.year, this.result.month, 1);

    const createPayrollDto: EmployeeCashAdvanceDto = {
      employeeId: this.form.value.employeeId,
      amount: Number(this.result.remaining.toFixed(2)),
      createDate: payrollDate.toISOString(),  // date for the payroll month
      typeOfCash: TypeOfCash.Salary,
      note: `صرف راتب الموظف لشهر ${this.monthNames[this.result.month]} لعام ${this.result.year}`
    };

    this.employeesService.addCashAdvance(createPayrollDto)
      .subscribe({
        next: (res: ApiResponse<string>) => {
          if (res.success && res.data) {
            this.toast.success('تم صرف الراتب بنجاح');
            this.dialogRef.close(true);
          } else {
            this.toast.error('فشل صرف الراتب');
          }
        },
        error: (err) => {
          this.toast.error(err.error?.message || 'حدث خطأ أثناء صرف الراتب');
        }
      });
  }
  close() {
    this.dialogRef.close();
  }

  loadYears() {
    const startYear = this.startDate.getFullYear();
    const currentYear = new Date().getFullYear();

    for (let y = startYear; y <= currentYear; y++) {
      this.years.push(y);
    }
  }

  filterMonthsOnYearChange() {
    this.form.get('year')!.valueChanges.subscribe(selectedYear => {
      if (!selectedYear) return;

      if (selectedYear == this.startDate.getFullYear()) {
        // months from start month → 12
        const startMonth = this.startDate.getMonth() + 1;
        this.months = Array.from({ length: 12 - startMonth + 1 }, (_, i) => i + startMonth);
      } else {
        // full year months
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      }

      // Clear the selected month if it's outside valid range
      this.form.patchValue({ month: '' });
    });
  }
}
