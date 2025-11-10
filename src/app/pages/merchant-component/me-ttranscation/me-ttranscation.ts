import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/shared/toast.service';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { ApiResponse } from '../../../model/api-response';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { PageEvent } from '../../../model/page-event';
import { firstValueFrom } from 'rxjs';
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-me-ttranscation',
  imports: [HModalComponent, HTableComponent, CommonModule],
  templateUrl: './me-ttranscation.html',
  styleUrl: './me-ttranscation.scss',
})
export class MeTtranscation implements OnInit{
  transctionList: TransactionDto[] = [];
  materialTypeLst: MaterialTypeVM[] = [];
  merchantLst: MerchantDto[] = [];
  totalMoneyTaken = 0;
  moneyToBePaid = 0;
  titleName = 'معاملات ';
balance: number = 0;
  total = 0;
  /** Table Columns */
  columns = [
    'نوع المعاملة',
    'نوع المادة',
    'الكمية',
    'السعر للوحدة',
    'الإجمالي',
    'المبلغ المدفوع',
  ];

  columnKeys = [
    'typeName',
    'materialTypeName',
    'quantity',
    'pricePerUnit',
    'totalAmount',
    'amountPaid',
  ];
  constructor(
    private toast: ToastService,
    private dialogRef: MatDialogRef<MeTtranscation>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionServices,
    private materialService: MaterialTypeServices,
    private merchantService: MerchantServices,
    private cdr: ChangeDetectorRef
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.loadReferenceData();
    this.loadTransactions();
  }

  /** Load all lookup data (materials + merchants) */
  private async loadReferenceData(): Promise<void> {
    try {
      const [matRes, merRes] = await Promise.all([
        firstValueFrom(this.materialService.getAll()),
        firstValueFrom(this.merchantService.getAll()),
      ]);

      if (matRes?.success) this.materialTypeLst = matRes.data ?? [];
      if (merRes?.success) this.merchantLst = merRes.data ?? [];
    } catch (err) {
      this.toast.error('فشل تحميل البيانات المرجعية.');
      console.error(err);
    }
  }

  onPageChange(pageEvent: PageEvent): void {
    const start = (pageEvent.pageIndex - 1) * pageEvent.pageSize;
    const end = start + pageEvent.pageSize;
    console.log(`عرض البيانات من ${start} إلى ${end}`);
  }

  /** Load all transactions */
  public loadTransactions(): void {
    const merchantID = this.data.merchantID;
    console.log(merchantID, 'معرف التاجر');
    this.transactionService.GetAllByMerchantId(merchantID).subscribe({
      next: (res: ApiResponse<TransactionDto[]>) => {
        if (res.success && res.data) {
          this.transctionList = res.data.map((t) => ({
            ...t,
            merchantName: this.getMerchantName(t.merchantId),
            materialTypeName: this.getMaterialTypeName(t.materialTypeId),
            typeName: t.type === 'Income' ? 'وارد' : 'صادر',
            totalAmount: t.quantity * t.pricePerUnit,
          }));
          this.total = res.data.length;
        this.moneyToBePaid = this.transctionList
          .filter(x => x.type === 'Income')                  // merchant sells to you
          .reduce((sum, t) => sum + t.quantity * t.pricePerUnit - t.amountPaid, 0);

        this.totalMoneyTaken = this.transctionList
          .filter(x => x.type === 'Outcome')                  // merchant buys from you
          .reduce((sum, t) => sum + t.quantity * t.pricePerUnit - t.amountPaid, 0);

        this.balance = this.totalMoneyTaken - this.moneyToBePaid;
        this.titleName += this.transctionList[0]?.merchantId ? ` - ${this.getMerchantName(this.transctionList[0].merchantId)}` : '';
          this.cdr.markForCheck();

        } else {
          this.toast.error('فشل تحميل المعاملات.');
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.error('حدث خطأ أثناء تحميل المعاملات.');
      },
    });
  }
  /** Safe lookup helpers */
  private getMerchantName(id: string): string {
    return this.merchantLst.find((x) => x.id === id)?.name ?? 'غير معروف';
  }

  private getMaterialTypeName(id: string): string {
    return this.materialTypeLst.find((x) => x.id === id)?.name ?? 'غير معروف';
  }

  close(): void {
    this.dialogRef.close();
  }
}
