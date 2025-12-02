import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/shared/toast.service';
import { TransactionServices } from '../../../core/Transaction/transaction-services';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { ApiResponse } from '../../../model/api-response';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { PageEvent } from '../../../model/page-event';
import { CommonModule } from '@angular/common';
import { AllTransByMerchantDto } from '../../../model/Transaction/all-trans-by-merchant-dto';
import { FilterForMeTC } from './filter-for-me-tc/filter-for-me-tc';
import { PaginationEntity } from '../../../model/pagination-entity';
import { CommonService } from '../../../core/common-service';

@Component({
  selector: 'app-me-ttranscation',
  imports: [HModalComponent, HTableComponent, CommonModule],
  templateUrl: './me-ttranscation.html',
  styleUrl: './me-ttranscation.scss',
})
export class MeTtranscation implements OnInit {
  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 }
  orginalTransctionList: TransactionDto[] = [];
  searchTransctionList: TransactionDto[] = [];
  materialTypeLst: MaterialTypeVM[] = [];
  merchantLst: MerchantDto[] = [];
  totalMoneyTaken = 0;
  moneyToBePaid = 0;
  totalWight = 0;
  totalImp = 0;
  totalExpense = 0;
  totalFinance = 0;
  titleName = 'معاملات ';
  balance: number = 0;
  /** Table Columns */
  columns = [
    'نوع المعاملة',
    'نوع المادة',
    'المخزن',
    'الكمية',
    'الإجمالي',
    'المبلغ المدفوع',
    'تاريخ المعامله'
  ];

  columnKeys = [
    'typeNameAr',
    'materialTypeName',
    'warehouseName',
    'quantity',
    'totalAmount',
    'amountPaid',
    'formattedDate'
  ];
  constructor(
    private toast: ToastService,
    private dialogRef: MatDialogRef<MeTtranscation>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private transactionService: TransactionServices,
    private commonServices: CommonService,
    private cdr: ChangeDetectorRef
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.loadTransactions();
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize;
    this.loadTransactions();
  }

  /** Load all transactions */
  public loadTransactions(): void {
    const merchantID = this.data.merchantID;
    console.log(merchantID, 'معرف التاجر');
    this.transactionService.GetAllByMerchantId(merchantID, this.pagination).subscribe({
      next: (res: ApiResponse<AllTransByMerchantDto>) => {
        console.log(res, 'استجابة المعاملات');
        if (res.success && res.data) {
          this.orginalTransctionList = res.data.transactions;
          this.searchTransctionList = res.data.transactions.map(item => ({
            ...item,
            formattedDate: this.commonServices.formatDateOnly(item.createDate)
          }));
          this.totalExpense = res.data.totalExpense
          this.balance = res.data.balance
          this.totalFinance = res.data.totalFinance
          this.totalMoneyTaken = res.data.totalMoneypay
          this.moneyToBePaid = res.data.totalMoneyProcessed
          this.totalWight = res.data.totalWight;
          this.totalImp = res.data.totalImpurities;
          this.titleName = `معاملات ${this.orginalTransctionList[0]?.merchantName || ''}`;
          this.pagination.totalCount = res.totalCount;
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
  onFilter() {
    this.dialog.open(FilterForMeTC, { width: '400px' })
      .afterClosed()
      .subscribe((filterData: any) => {
        if (!filterData) return;

        this.pagination.from = filterData.from
        this.pagination.to = filterData.to
        this.loadTransactions();
      });
  }
  close(): void {
    this.dialogRef.close();
  }
}
