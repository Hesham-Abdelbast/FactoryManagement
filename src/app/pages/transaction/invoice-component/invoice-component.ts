import { Component, Inject } from '@angular/core';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { InvoiceData } from '../../../model/invoice-data';
import { ActivatedRoute } from '@angular/router';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { ApiResponse } from '../../../model/api-response';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-component',
  imports: [],
  templateUrl: './invoice-component.html',
  styleUrl: './invoice-component.scss',
})
export class InvoiceComponent {
  transaction!: TransactionDto;
  merchant!:MerchantDto;
  materialType!:MaterialTypeVM
  transactionId!:string| null;
  invoiceData!: InvoiceData;
  totalAmount: number = 0;
  taxAmount: number = 0;
  balanceDue: number = 0;

  constructor(
    private transactionServices:TransactionServices,
    private activeRouter:ActivatedRoute,
    private merchantServices:MerchantServices,
    private materialTypeServices:MaterialTypeServices,
    private dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe({
      next: (params) => {
        this.transactionId = params.get('id');
        this.getTransactionById(this.transactionId??'');
      }
    });
    this.getTransactionById(this.data.id??'');
    
  }

  private calculateTotalAmount(quantity: number, pricePerUnit: number): number {
    return quantity * pricePerUnit;
  }


  private calculateBalanceDue(totalAmount: number, tax: number, amountPaid: number): number {
    return totalAmount + tax - amountPaid;
  }

  private getCurrentDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('ar-EG', options);
  }

  getTransactionTypeText(): string {
    return this.transaction.type === 1 ? 'دخل' : 'مصروف';
  }

  getTransactionTypeClass(): string {
    return this.transaction.type === 1 ? 'income' : 'outcome';
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('ar-EG', { minimumFractionDigits: 2 }) + ' $';
  }

  formatNumber(number: number): string {
    return number.toLocaleString('ar-EG');
  }

  printInvoice(): void {
    window.print();
  }

  saveAsPDF(): void {
    // In a real application, implement PDF generation logic here
    alert('في التطبيق الفعلي، سيقوم هذا بزرع وتنزيل نسخة PDF من الفاتورة.');
  }

  getTransactionById(id:string){
    this,this.transactionServices.getById(id).subscribe( (res : ApiResponse<TransactionDto>) => {
      if(res.success && res.data){

        this.materialTypeServices.getById(this.transaction.materialTypeId).subscribe((resMT : ApiResponse<MaterialTypeVM>) =>{
          if(resMT.success && resMT.data)
            this.materialType = resMT.data;
        })

        this.merchantServices.getById(this.transaction.merchantId).subscribe((resM: ApiResponse<MerchantDto>) =>{
          if(resM.success && resM.data)
            this.merchant = resM.data;
        })
        this.transaction = res.data
        this.invoiceData.transaction.id = res.data.id;
        this.invoiceData.transaction.amountPaid = res.data.amountPaid;
        this.invoiceData.transaction.quantity = res.data.quantity;
        this.invoiceData.transaction.notes = res.data.notes;
        this.invoiceData.transaction.pricePerUnit = res.data.pricePerUnit;
        this.invoiceData.transaction.pricePerUnit = res.data.pricePerUnit;
        
        this.invoiceData.transaction.materialTypeId = res.data.materialTypeId;
        this.invoiceData.transaction.materialType = this.materialType.name;

        this.invoiceData.transaction.merchantId = res.data.merchantId;
        this.invoiceData.transaction.merchantAddress = this.merchant.address;
        this.invoiceData.transaction.merchantContact = this.merchant.phone;
        this.invoiceData.transaction.merchant = this.merchant.name;

        

        console.log(this.invoiceData)
      }
    })
  }
}
