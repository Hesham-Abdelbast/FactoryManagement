import { Component, Inject } from '@angular/core';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceLstDto } from '../../../model/Transaction/invoice-lst-dto';

@Component({
  selector: 'app-invoice-lst-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-lst-print.html',
  styleUrl: './invoice-lst-print.scss',
})
export class InvoiceLstPrint {
  invoice!: InvoiceLstDto;
  dateStr=new Date();
  constructor(
    private dialogRef: MatDialogRef<InvoiceLstPrint>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.Data) {
      this.invoice = data.Data;
    }
  }

  close() {
    this.dialogRef.close();
  }

  print() {
    window.print();
  }

  getDate() {
    return this.dateStr ? new Date(this.dateStr).toLocaleDateString('ar-EG') : '';
  }
}
