import { Component, Inject, OnInit } from '@angular/core';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { InvoiceData } from '../../../model/invoice-data';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { ApiResponse } from '../../../model/api-response';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-component',
  templateUrl: './invoice-component.html',
  styleUrls: ['./invoice-component.scss'],
})
export class InvoiceComponent implements OnInit {

  transaction!: TransactionDto;
  merchant!: MerchantDto;
  materialType!: MaterialTypeVM;
totalAmount = 0;
balanceDue = 0;

  // Initialize to avoid null errors
  invoiceData: InvoiceData = {
  companyInfo: {
    name: '',
    address: '',
    phone: ''
  },
  transaction: {
    id: '',
    quantity: 0,
    amountPaid: 0,
    notes: '',
    pricePerUnit: 0,
    materialTypeId: '',
    materialType: '',
    merchantId: '',
    merchant: '',
    merchantAddress: '',
    merchantContact: '',
    date: '',
    type: 1
  }
};
  constructor(
    private transactionServices: TransactionServices,
    private merchantServices: MerchantServices,
    private materialTypeServices: MaterialTypeServices,
    private dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Id: string }
  ) {}


  ngOnInit(): void {
    this.getInvoiceData();
  }

  getInvoiceData() {
    this.transactionServices.getById(this.data.Id).subscribe((res: ApiResponse<TransactionDto>) => {
      if (res.success && res.data) {
        this.transaction = res.data; 
      }
    });

    this.updateTotals();
  }
formatNumber(number: number): string { return number.toLocaleString('ar-EG'); }
  getTransactionTypeText(): string {
    return this.transaction?.type === 'Income' ? 'وارد' : 'صادر';
  }

  getTransactionTypeClass(): string {
    return this.transaction?.type === 'Income' ? 'income' : 'outcome';
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('ar-EG', { minimumFractionDigits: 2 }) + ' $';
  }

  printInvoice(): void {
    window.print();
  }

  
updateTotals() {
  this.totalAmount = this.transaction.quantity * this.transaction.pricePerUnit;
  this.balanceDue = this.totalAmount - this.transaction.amountPaid;
}
}
