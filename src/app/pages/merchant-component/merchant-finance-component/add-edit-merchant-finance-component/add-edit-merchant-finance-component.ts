import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';

import { ToastService } from '../../../../core/shared/toast.service';
import { ApiResponse } from '../../../../model/api-response';
import { CommonService } from '../../../../core/common-service';
import { MerchantFinanceDto } from '../../../../model/Merchant/merchant-finance-dto';
import { MerchantFinance } from '../../../../core/Merchant/merchant-finance';

@Component({
  selector: 'app-add-edit-merchant-finance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-merchant-finance-component.html',
  styleUrl: './add-edit-merchant-finance-component.scss',
})
export class AddEditMerchantFinanceComponent implements OnInit {

  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private service = inject(MerchantFinance);
  private dialogRef = inject(MatDialogRef<AddEditMerchantFinanceComponent>);
  private commonService = inject(CommonService);

  form!: FormGroup;
  isEditMode = false;
  item: MerchantFinanceDto | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.item = data?.item ?? null;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.item;

    const formattedDate = this.item?.operationDate
      ? this.commonService.formatForInputDate(this.item.operationDate)
      : '';

    this.form = this.fb.group({
      merchantId: [this.data?.merchantId ?? '', Validators.required],
      notes: [this.item?.notes ?? ''],
      amount: [this.item?.amount ?? 0, [Validators.required, Validators.min(1)]],
      operationDate: [formattedDate, Validators.required]
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

    const dto: MerchantFinanceDto = this.form.value;

    if (this.isEditMode) {
      this.service.update(dto).subscribe({
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
