import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/shared/toast.service';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';
import { CommonModule } from '@angular/common';
import { CreateTransactionDto } from '../../../model/Transaction/create-transaction-dto';
import { HAutoCompleteComponent } from "../../../shared/Component/h-auto-complete/h-auto-complete";
import { DicKeyValue } from '../../../model/dic-key-value';

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.html',
  styleUrl: './add-edit-transaction.scss',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent, FormsModule, HAutoCompleteComponent]
})
export class AddEditTransaction implements OnInit {

  transactionForm!: FormGroup;
  isEditMode = false;
  loading = false;
  remaining = 0;
  merchantKeyValue: DicKeyValue[] = [];

  constructor(
    private fb: FormBuilder,
    private service: TransactionServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditTransaction>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.isEditMode = this.data?.isEdit ?? false;

    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      materialTypeId: ['', Validators.required],
      warehouseId: ['', Validators.required],
      merchantId: ['', Validators.required],

      carDriverName: [''],

      carAndMatrerialWeight: [null, [Validators.required, Validators.min(1)]],
      carWeight: [null, [Validators.min(0)]],

      quantity: [{ value: 0, disabled: true }],
      percentageOfImpurities: [0, [Validators.min(0), Validators.max(100)]],
      weightOfImpurities: [{ value: 0, disabled: true }],

      pricePerUnit: [null, [Validators.required, Validators.min(0.01)]],
      amountPaid: [0, [Validators.min(0)]],
      createDate: [Date.now(), Validators.required],
      showPhoneNumber: [false],

      notes: ['', Validators.maxLength(500)],
      totalAmount: [0, [Validators.min(1)]]
    });

    if (this.isEditMode && this.data.item) {
      this.transactionForm.addControl('id', this.fb.control(this.data.item.id, Validators.required));

      const formattedDate = this.data.item.createDate
        ? this.data.item.createDate.split('T')[0]
        : new Date().toISOString().split('T')[0];

      this.transactionForm.patchValue({
        ...this.data.item,
        createDate: formattedDate,
        showPhoneNumber: this.data.item.showPhoneNumber.toString()
      });

      this.recalculateQuantity();
    }

    this.merchantKeyValue = this.data.merchantLst.map((e: any) => ({ key: e.id, value: e.name } as DicKeyValue));
    console.log(this.merchantKeyValue)

    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      this.toast.error("الرجاء تعبئة البيانات المطلوبة بشكل صحيح");
      return;
    }
    console.log('showPhoneNumber: ', this.transactionForm.get('showPhoneNumber')?.value === 'true')
    const payload: CreateTransactionDto = {
      ...this.transactionForm.getRawValue(),
      createDate: new Date(this.transactionForm.get('createDate')?.value).toISOString(),
      showPhoneNumber: this.transactionForm.get('showPhoneNumber')?.value === 'true'
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

  onSelected(id: string) {
    if (this.transactionForm.contains('merchantId')) {
      this.transactionForm.get('merchantId')?.setValue(id);
    }
  }

  private getValue(control: string): number {
    return this.numeric(this.transactionForm.get(control)?.value);
  }

  private setValue(control: string, value: number) {
    const c = this.transactionForm.get(control);
    if (!c) return;

    c.setValue(Number(value.toFixed(2)), { emitEvent: false });

    // Reset state so Angular does NOT block future automatic updates
    c.markAsPristine();
    c.markAsUntouched();
  }

  invalid(control: string): boolean {
    const c = this.transactionForm.get(control);
    return !!(c && c.touched && c.invalid);
  }

  recalculateQuantity() {
    const total = this.getValue('carAndMatrerialWeight');
    const empty = this.getValue('carWeight');

    const net = Math.max(total - empty, 0);
    this.setValue('quantity', net);

    this.recalculateImpurities();
  }

  recalculateImpurities() {
    const quantity = this.getValue('quantity');
    const impuritiesPercent = this.getValue('percentageOfImpurities');

    const impurityWeight = quantity * (impuritiesPercent / 100);
    this.setValue('weightOfImpurities', impurityWeight);

    const finalQuantity = Math.max(quantity - impurityWeight, 0);
    this.setValue('quantity', finalQuantity);

  }

  updateRemaining() {
    const paid = this.getValue('amountPaid');
    const totalAmount = this.getValue('totalAmount');

    this.remaining = Number((totalAmount - paid).toFixed(2));
  }

  numeric(val: any): number {
    const v = Number(val);
    return isNaN(v) || v < 0 ? 0 : v;
  }

  close() {
    this.dialogRef.close(false);
  }
}
