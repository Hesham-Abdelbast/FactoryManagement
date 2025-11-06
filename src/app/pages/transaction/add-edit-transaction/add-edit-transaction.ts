import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { ToastService } from '../../../core/shared/toast.service';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';
import { ApiResponse } from '../../../model/api-response';

interface DialogData {
  isEdit: boolean;
  item: TransactionDto | null;
  materialTypeLst: MaterialTypeVM[];
  merchantLst: MerchantDto[];
}

@Component({
  selector: 'app-add-edit-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-transaction.html',
  styleUrls: ['./add-edit-transaction.scss'],
})
export class AddEditTransaction implements OnInit {
  transactionForm!: FormGroup;

  isEditMode = false;
  materialTypeLst: MaterialTypeVM[] = [];
  merchantLst: MerchantDto[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditTransaction>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cdr: ChangeDetectorRef
  ) {
    this.transactionForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.isEditMode = this.data?.isEdit ?? false;
    this.materialTypeLst = this.data.materialTypeLst ?? [];
    this.merchantLst = this.data.merchantLst ?? [];

    this.createForm();
  }

  /** Create or initialize form */
  createForm(): void {
    const transaction: TransactionDto | null = this.data.item;
    if (this.isEditMode && this.data.item) {
      this.transactionForm = this.fb.group({
        id: [transaction?.id ?? null],
        type: [transaction?.type, Validators.required],
        transactionIdentifier:[transaction?.transactionIdentifier],
        materialTypeId: [transaction?.materialTypeId ?? '', Validators.required],
        quantity: [transaction?.quantity ?? 0, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [transaction?.pricePerUnit ?? 0, [Validators.required, Validators.min(0.01)]],
        merchantId: [transaction?.merchantId ?? '', Validators.required],
        notes: [transaction?.notes ?? '', [Validators.maxLength(500)]],
        amountPaid: [transaction?.amountPaid ?? 0, [Validators.min(0)]],
      });
    }
    else {
      this.transactionForm = this.fb.group({
        id: [null],
        type: ['', Validators.required],
        transactionIdentifier:[''],
        materialTypeId: ['', Validators.required],
        quantity: [, [Validators.required, Validators.min(0.01)]],
        pricePerUnit: [, [Validators.required, Validators.min(0.01)]],
        merchantId: ['', Validators.required],
        notes: ['', [Validators.maxLength(500)]],
        amountPaid: [, [Validators.min(0)]],
      });
    }

    console.log(transaction)

    // trigger CD after patch to avoid ExpressionChanged error
    this.cdr.detectChanges();
  }

  /** Compute total */
  get totalAmount(): number {
    const q = this.transactionForm.get('quantity')?.value || 0;
    const p = this.transactionForm.get('pricePerUnit')?.value || 0;
    return +(q * p).toFixed(2);
  }

  /** Handle submit */
  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const transaction: TransactionDto = {
      ...this.transactionForm.value,
      type: Number(this.transactionForm.value.type),
    };

    this.isEditMode ? this.update(transaction) : this.create(transaction);
  }

  /** Create transaction */
  private create(transaction: TransactionDto): void {
    this.transactionService.add(transaction).subscribe({
      next: (res: ApiResponse<string>) => {
        if (res.success) {
          this.toast.success('تم إضافة المعاملة بنجاح.');
          this.dialogRef.close(true);
        } else {
          this.toast.error('فشل في إضافة المعاملة.');
        }
      },
      error: () => {
        this.toast.error('حدث خطأ أثناء إضافة المعاملة.');
      },
    });
  }

  /** Update transaction */
  private update(transaction: TransactionDto): void {
    if (!transaction.id) transaction.id = this.data.item?.id ?? '';
    console.log(transaction, 'تحديث المعاملة');
    this.transactionService.update(transaction).subscribe({
      next: (res: ApiResponse<boolean>) => {
        if (res.success) {
          this.toast.success('تم تعديل المعاملة بنجاح.');
          this.dialogRef.close(true);
        } else {
          console.log(res.returnMsg)
          this.toast.error(res.returnMsg);
        }
      },
      error: () => {
        this.toast.error('حدث خطأ أثناء تحديث المعاملة.');
      },
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
