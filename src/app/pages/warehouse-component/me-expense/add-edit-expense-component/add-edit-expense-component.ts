import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { ToastService } from '../../../../core/shared/toast.service';
import { ApiResponse } from '../../../../model/api-response';
import { WarehouseExpenseServices } from '../../../../core/WarehouseExpense/warehouse-expense-services';
import { WarehouseExpenseDto } from '../../../../model/Warehouse/warehouse-expense-dto';
import { CommonService } from '../../../../core/common-service';
@Component({
  selector: 'app-add-edit-expense-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-expense-component.html',
  styleUrl: './add-edit-expense-component.scss',
})
export class AddEditExpenseComponent implements OnInit {

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private service = inject(WarehouseExpenseServices);
  private dialogRef = inject(MatDialogRef<AddEditExpenseComponent>);
  private commonServices = inject(CommonService);

  form!: FormGroup;
  isEditMode = false;
  item: WarehouseExpenseDto | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data?.item ?? null;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.item;

    // Prepare createDate for input type="date"
    const formattedDate = this.item?.createDate
      ? this.commonServices.formatForInputDate(this.item.createDate)
      : '';

    // Build the form
    this.form = this.fb.group({
      warehouseId: [this.data?.Id ?? ''],
      notes: [this.item?.notes ?? ''],
      amount: [this.item?.amount ?? 0, [Validators.required, Validators.min(0)]],
      createDate: [formattedDate, Validators.required]
    });

    // Add id only in edit mode
    if (this.isEditMode && this.item?.id) {
      this.form.addControl('id', this.fb.control(this.item.id));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const dto: WarehouseExpenseDto = this.form.value;
    if (this.isEditMode) {
      this.service.update(dto).subscribe({
        next: (res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم التعديل بنجاح');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error('فشل في عملية التعديل')
      });
    } else {
      this.service.add(dto).subscribe({
        next: (res: ApiResponse<string>) => {
          if (res.success) {
            this.toast.success('تم الحفظ بنجاح');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error('فشل في عملية الحفظ')
      });
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
