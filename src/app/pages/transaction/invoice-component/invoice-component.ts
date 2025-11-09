import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, take } from 'rxjs/operators';

import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { ApiResponse } from '../../../model/api-response';
import { InvoiceDto } from '../../../model/Transaction/invoice-dto';
import { ToastService } from '../../../core/shared/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-component',
  templateUrl: './invoice-component.html',
  styleUrls: ['./invoice-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class InvoiceComponent implements OnInit{
  invoiceDto?: InvoiceDto;
  isLoading = false;

  constructor(
    private transactionServices: TransactionServices,
    private dialogRef: MatDialogRef<InvoiceComponent>,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { Id: string }
  ) {}

  ngOnInit(): void {
    this.getInvoiceData();
  }

  getInvoiceData(): void {
    this.isLoading = true;
    this.transactionServices
      .getInvoiceById(this.data.Id)
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (res: ApiResponse<InvoiceDto>) => {
          if (res.success && res.data) {
            this.invoiceDto = res.data;
          } else {
            console.error('Failed to fetch invoice data:', res.returnMsg);
            this.toastService.error('فشل في جلب بيانات الفاتورة');
            this.dialogRef.close();
          }
        },
        error: (err) => {
          console.error('Failed to fetch invoice data:', err);
          this.toastService.error('حدث خطأ أثناء جلب البيانات');
          this.dialogRef.close();
        },
      });
  }

  // Formatting helpers
  formatNumber(value?: number): string {
    return (value ?? 0).toLocaleString('ar-EG');
  }

  formatCurrency(amount?: number): string {
    // You can switch to Intl currency if you have a currency code on the DTO.
    return (amount ?? 0).toLocaleString('ar-EG', { minimumFractionDigits: 2 }) + ' $';
  }

  formatPercentage(value?: number): string {
    const v = value ?? 0;
    return `${v.toLocaleString('ar-EG', { maximumFractionDigits: 2 })}%`;
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  }

  // Computed UI helpers
  getTransactionTypeText(): string {
    const t = this.invoiceDto?.type;
    if (!t) return '-';
    return t === 'Income' ? 'وارد' : 'صادر';
  }

  getTransactionTypeClass(): string {
    return this.invoiceDto?.type === 'Income' ? 'income' : 'outcome';
  }

  get totalAmount(): number {
    if (!this.invoiceDto) return 0;
    return this.invoiceDto.totalAmount ?? (this.invoiceDto.pricePerUnit ?? 0) * (this.invoiceDto.quantity ?? 0);
  }

  get balanceDue(): number {
    if (!this.invoiceDto) return 0;
    return this.invoiceDto.remainingAmount ?? (this.totalAmount - (this.invoiceDto.amountPaid ?? 0));
  }

  // Truck computations
  get grossWeight(): number {
    if (!this.invoiceDto) return 0;
    const total = this.invoiceDto.carAndMatrerialWeight ?? 0;
    const car = this.invoiceDto.carWeight ?? 0;
    return Math.max(total - car, 0);
  }

  get impuritiesWeight(): number {
    if (!this.invoiceDto) return 0;
    if (this.invoiceDto.weightOfImpurities != null) {
      return this.invoiceDto.weightOfImpurities;
    }
    const percentage = (this.invoiceDto.percentageOfImpurities ?? 0) / 100;
    return Math.max(this.grossWeight * percentage, 0);
  }

  get netAfterImpurities(): number {
    return Math.max(this.grossWeight - this.impuritiesWeight, 0);
  }

  printInvoice(): void {
    window.print();
  }
}