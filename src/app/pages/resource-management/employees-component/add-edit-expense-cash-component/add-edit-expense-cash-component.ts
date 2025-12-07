import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';

@Component({
  selector: 'app-add-edit-expense-cash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-expense-cash-component.html',
  styleUrls: ['./add-edit-expense-cash-component.scss'],
})
export class AddEditExpenseCashComponent {
  
  form!: FormGroup;
  isEditMode = false;
  entityType: 'cash' | 'expense' = 'cash';
  headerLabel = '';

  constructor(
    private fb: FormBuilder,
    private service: EmployeeManagementService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditExpenseCashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {

    this.entityType = this.data?.type || 'cash';
    this.isEditMode = this.data?.isEdit || false;

    this.headerLabel = this.entityType === 'cash'
      ? (this.isEditMode ? 'تعديل سلفة' : 'إضافة سلفة')
      : (this.isEditMode ? 'تعديل مصروف' : 'إضافة مصروف');

    if (this.isEditMode) {
      this.form = this.fb.group({
        id: [this.data.item.id],
        employeeId: [this.data.item.employeeId, Validators.required],
        amount: [this.data.item.amount, [Validators.required, Validators.min(1)]],
        note: [this.data.item.note || ''],
        createDate:[this.data.item.createDate]
      });
    } else {
      this.form = this.fb.group({
        employeeId: [this.data.employeeId, Validators.required],
        amount: [0, [Validators.required, Validators.min(1)]],
        note: [''],
        createDate:[new Date().toString()]
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const model = this.form.value;

    if (this.isEditMode) {
      this.update(model);
    } else {
      this.create(model);
    }
  }

  create(model: any): void {
    const apiCall = this.entityType === 'cash'
      ? this.service.addCashAdvance(model)
      : this.service.addPersonalExpense(model);

    apiCall.subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تمت العملية بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('حدث خطأ أثناء الإضافة.');
      }
    });
  }

  update(model: any): void {
    model.id = this.data.item.id;

    const apiCall = this.entityType === 'cash'
      ? this.service.UpdateEmployeeCashAdvance(model)
      : this.service.UpdatePersonalExpense(model);

    apiCall.subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success('تم التعديل بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في حفظ التعديلات.');
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
