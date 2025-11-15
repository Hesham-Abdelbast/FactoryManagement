import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { EmployeeDto } from '../../../../model/Employee/employee-dto';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-employee.html',
  styleUrls: ['./add-edit-employee.scss'],
})
export class AddEditEmployee {
  employeeForm!: FormGroup;
  employee?: EmployeeDto;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeManagementService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditEmployee>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data?.isEdit) {
      this.isEditMode = true;
      this.employee = this.data.Item;
      this.employeeForm = this.fb.group({
        id: [this.employee?.id],
        name: [this.employee?.name, [Validators.required, Validators.maxLength(50)]],
        startDate: [this.employee?.startDate, [Validators.required]],
        baseSalary: [this.employee?.baseSalary, [Validators.required, Validators.min(0)]],
      });
    } else {
      this.employeeForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        startDate: ['', [Validators.required]],
        baseSalary: [0, [Validators.required, Validators.min(0)]],
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee: EmployeeDto = this.employeeForm.value;

    if (this.isEditMode) {
      this.update(employee);
    } else {
      this.create(employee);
    }
  }

  create(employee: EmployeeDto): void {
    this.employeeService.addEmployee(employee).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تم إضافة الموظف بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في إضافة الموظف.');
      }
    });
  }

  update(employee: EmployeeDto): void {
    employee.id = this.data.Item.id;
    this.employeeService.updateEmployee(employee).subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success('تم تعديل الموظف بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في تعديل الموظف.');
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
