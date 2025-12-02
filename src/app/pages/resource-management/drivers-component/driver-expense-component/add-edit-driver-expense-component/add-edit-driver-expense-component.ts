import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverManagmentServices } from '../../../../../core/Drivers/driver-managment-services';
import { HModalComponent } from '../../../../../shared/Component/h-modal/h-modal.component';
import { ToastService } from '../../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MerchantExpenseDto } from '../../../../../model/Merchant/merchant-expense-dto';
import { ApiResponse } from '../../../../../model/api-response';
import { CreateDriverExpenseDto } from '../../../../../model/Drivers/create-driver-exponse-dto';
import { CommonService } from '../../../../../core/common-service';

@Component({
  selector: 'app-add-edit-driver-expense-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-driver-expense-component.html',
  styleUrls: ['./add-edit-driver-expense-component.scss'],
})
export class AddEditDriverExpenseComponent {

  expenseForm!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: DriverManagmentServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditDriverExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService:CommonService
  ) { }

  ngOnInit() {

    this.isEdit = !!this.data?.item;

    this.expenseForm = this.fb.group({
      id: [this.data?.item?.id ?? null],
      driverId: [this.data?.driverId ?? null],
      amount: [this.data?.item?.amount ?? null, [Validators.required, Validators.min(1)]],
      notes: [this.data?.item?.notes ?? ''],
      expenseDate: [this.commonService.formatForInputDate(this.data?.item?.expenseDate) ?? new Date(), Validators.required]
    });

  }

  submit() {
    if (this.expenseForm.invalid) return;

    const model: CreateDriverExpenseDto = this.expenseForm.value;

    if (this.isEdit)
      this.update(model);
    else
      this.create(model);
  }

  create(model: CreateDriverExpenseDto) {
    this.expenseService.addExpense(model).subscribe((res: ApiResponse<string>) => {
      if (res.success) {
        this.toast.success("تم إضافة السلفة بنجاح");
        this.dialogRef.close(true);
      } else this.toast.error(res.returnMsg);
    });
  }

  update(model: CreateDriverExpenseDto) {
    this.expenseService.updateExpense(model).subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success("تم تعديل السلفة بنجاح");
        this.dialogRef.close(true);
      } else this.toast.error(res.returnMsg);
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
