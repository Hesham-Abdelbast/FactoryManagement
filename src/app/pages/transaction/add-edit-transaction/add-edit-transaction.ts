import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/shared/toast.service';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';
import { CommonModule } from '@angular/common';
import { CreateTransactionDto } from '../../../model/Transaction/create-transaction-dto';

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.html',
  styleUrl: './add-edit-transaction.scss',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent]
})
export class AddEditTransaction implements OnInit {

  transactionForm!: FormGroup;
  isEditMode = false;
  loading = false;

  totalAmount = 0;
  remaining = 0;

  constructor(
    private fb: FormBuilder,
    private service: TransactionServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditTransaction>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.isEditMode = this.data?.isEdit ?? false;

    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      materialTypeId: ['', Validators.required],
      warehouseId: ['', Validators.required],
      merchantId: ['', Validators.required],

      carDriverName: [''],

      carAndMatrerialWeight: [null, [Validators.required, Validators.min(1)]],
      carWeight: [null, [Validators.required, Validators.min(1)]],

      quantity: [{ value: 0, disabled: true }],
      percentageOfImpurities: [0, [Validators.min(0), Validators.max(100)]],
      weightOfImpurities: [{ value: 0, disabled: true }],

      pricePerUnit: [null, [Validators.required, Validators.min(0.01)]],
      amountPaid: [0, [Validators.min(0)]],

      notes: ['', Validators.maxLength(500)],
    });

    // ✅ Editing mode
    if (this.isEditMode && this.data.item) {
      this.transactionForm.addControl('id', this.fb.control(this.data.item.id, Validators.required));
      this.transactionForm.patchValue(this.data.item);
      console.log('Editing item:', this.data.item);
      this.recalculateQuantity();
      this.updateTotalAmount();
    }
  }

  // ✅ Helper: avoid NaN
  numeric(val: any): number {
    const v = Number(val);
    return isNaN(v) || v < 0 ? 0 : v;
  }

  invalid(control: string): boolean {
    const c = this.transactionForm.get(control);
    return !!(c && c.touched && c.invalid);
  }

  // ✅ Quantity recalculation with check
  recalculateQuantity() {
    const total = this.numeric(this.transactionForm.get('carAndMatrerialWeight')?.value);
    const empty = this.numeric(this.transactionForm.get('carWeight')?.value);

    // Prevent empty > loaded
    const net = total > empty ? total - empty : 0;

    this.transactionForm.get('quantity')?.setValue(Number(net.toFixed(2)), { emitEvent: false });
    this.recalculateImpurities();
    
  }

  recalculateImpurities() {
    const q = this.numeric(this.transactionForm.get('quantity')?.value);
    const p = this.numeric(this.transactionForm.get('percentageOfImpurities')?.value);

    const impurity = q * (p / 100);
    this.transactionForm.get('weightOfImpurities')?.setValue(Number(impurity.toFixed(2)), { emitEvent: false });

    const net = q > impurity ? q - impurity : 0;
    this.transactionForm.get('quantity')?.setValue(Number(net.toFixed(2)), { emitEvent: false });
    this.updateTotalAmount();
  }

  updateTotalAmount() {
    const quantity = this.numeric(this.transactionForm.get('quantity')?.value);
    const price = this.numeric(this.transactionForm.get('pricePerUnit')?.value);

    this.totalAmount = Number((quantity * price).toFixed(2));
    this.updateRemaining();
  }

  updateRemaining() {
    const paid = this.numeric(this.transactionForm.get('amountPaid')?.value);
    this.remaining = Number((this.totalAmount - paid).toFixed(2));
  }

  onSubmit() {
  if (this.transactionForm.invalid) {
    this.transactionForm.markAllAsTouched();
    this.toast.error("الرجاء تعبئة البيانات المطلوبة بشكل صحيح");
    return;
  }

  const payload: CreateTransactionDto = {
    ...this.transactionForm.getRawValue(),
    totalAmount: this.totalAmount
  };
  console.log('Payload:', payload);

  if (this.isEditMode) {
    this.service.update(payload).subscribe({
      next: (res: any) => this.handleResponse(res, true),
      error: () => this.toast.error('حدث خطأ أثناء الاتصال بالخادم')
    });
  } else {
    this.service.add(payload).subscribe({
      next: (res: any) => this.handleResponse(res, false),
      error: () => this.toast.error('حدث خطأ أثناء الاتصال بالخادم')
    });
  }
}

private handleResponse(res: any, isEdit: boolean) {
  if (res.success) {
    this.toast.success(isEdit ? 'تم التحديث بنجاح' : 'تم الحفظ بنجاح');
    this.dialogRef.close(true);
  } else {
    this.toast.error(res.returnMsg || 'فشل العملية');
  }
}

  close() {
    this.dialogRef.close(false);
  }
}
