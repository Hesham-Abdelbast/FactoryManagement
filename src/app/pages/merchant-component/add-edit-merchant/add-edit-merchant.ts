import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { ToastService } from '../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { ApiResponse } from '../../../model/api-response';
import { CommonModule } from '@angular/common';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';

@Component({
  selector: 'app-add-edit-merchant',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-merchant.html',
  styleUrl: './add-edit-merchant.scss',
})
export class AddEditMerchant {
  merchantForm!: FormGroup;
  merchant?: MerchantDto;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private MerchantService: MerchantServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditMerchant>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  ngOnInit(): void {

    if (this.data?.isEdit) {
      this.isEditMode = true;
      this.merchant = this.data.Item;
      this.merchantForm = this.fb.group({
      id: [this.merchant?.id],
      name: [this.merchant?.name, [Validators.required, Validators.maxLength(50)]],
      phone: [this.merchant?.phone, [Validators.pattern(/^[0-9]{8,15}$/)]],
      email: [this.merchant?.email, [Validators.email]],
      address: [this.merchant?.address, [Validators.maxLength(200)]]
    });
    }
    else {
      this.merchantForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.pattern(/^[0-9]{8,15}$/)]],
      email: ['', [Validators.email]],
      address: ['', [Validators.maxLength(200)]]
    });
    }
  }

  onSubmit(): void {
    if (this.merchantForm.invalid){
      this.merchantForm.markAllAsTouched();
      return;
    }

    const Merchant: MerchantDto = this.merchantForm.value;

    if (this.isEditMode) {
      this.update(Merchant);
    } else {
      this.create(Merchant);
    }
  }

  create(Merchant: MerchantDto): void {
    console.log(Merchant)
    this.MerchantService.add(Merchant).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تم اضافه التاجر بنجاح.');
        this.dialogRef.close(true)
      }
      else
        this.toast.error('فشل في إضافة التاجر.')
    });
  }

  update(Merchant: MerchantDto): void {
    Merchant.id = this.data.Item.id;
    console.log(Merchant)
    this.MerchantService.update(Merchant).subscribe((res: ApiResponse<boolean>) => {

      if (res.success) {
        this.toast.success('تم تعديل التاجر بنجاح.');
        this.dialogRef.close(true);
      } else {
        console.log(res)
        this.toast.error('فشل في تحديث التاجر.');
      }

    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
