import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { ToastService } from '../../../../core/shared/toast.service';
import { MerchantExpenseCreateDto } from '../../../../model/Merchant/merchant-expense-create-dto';
import { MerchantExpenseServices } from '../../../../core/Merchant/merchant-expense-services';
import { ApiResponse } from '../../../../model/api-response';
import { CommonService } from '../../../../core/common-service';
import { MerchantExpenseDto } from '../../../../model/Merchant/merchant-expense-dto';

@Component({
  selector: 'app-add-edit-merchant-exponse-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-merchant-exponse-component.html',
  styleUrl: './add-edit-merchant-exponse-component.scss',
})
export class AddEditMerchantExponseComponent implements OnInit {

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private service = inject(MerchantExpenseServices);
  private dialogRef = inject(MatDialogRef<AddEditMerchantExponseComponent>);
  private commonService = inject(CommonService);

  form!: FormGroup;
  isEditMode = false;
  item: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data?.item ?? null;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.item;

    const formattedDate = this.item?.expenseDate
      ? this.commonService.formatForInputDate(this.item.expenseDate)
      : '';

    this.form = this.fb.group({
      merchantId: [this.data?.merchantId ?? '', Validators.required],
      notes: [this.item?.notes ?? ''],
      amount: [this.item?.amount ?? 0, [Validators.required, Validators.min(1)]],
      expenseDate: [formattedDate, Validators.required]
    });

    if (this.isEditMode && this.item?.id) {
      this.form.addControl('id', this.fb.control(this.item.id));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error("يرجى ملء جميع البيانات المطلوبة");
      return;
    }

    const dto: MerchantExpenseCreateDto = this.form.value;
    const updateDto: MerchantExpenseDto = this.form.value;

    if (this.isEditMode) {
      this.service.update(updateDto).subscribe({
        next: (res: ApiResponse<boolean>) => {
          res.success ? this.toast.success("تم التعديل بنجاح") : this.toast.error(res.returnMsg);
          if (res.success) this.dialogRef.close(true);
        },
        error: () => this.toast.error("فشل في عملية التعديل")
      });
    } else {
      this.service.add(dto).subscribe({
        next: (res: ApiResponse<string>) => {
          res.success ? this.toast.success("تم الحفظ بنجاح") : this.toast.error(res.returnMsg);
          if (res.success) this.dialogRef.close(true);
        },
        error: () => this.toast.error("فشل في عملية الحفظ")
      });
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
