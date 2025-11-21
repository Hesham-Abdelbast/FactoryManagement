import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../model/api-response';
import { HTableComponent } from '../../shared/Component/h-table/h-table.component';
import { TransactionDto } from '../../model/Transaction/transaction-dto';
import { TableAction } from '../../model/table-action';
import { TransactionServices } from '../../core/Transaction/transaction-services';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../core/shared/toast.service';
import { AddEditTransaction } from './add-edit-transaction/add-edit-transaction';
import { PageEvent } from '../../model/page-event';
import { MaterialTypeVM } from '../../model/MaterialType/material-type-vm';
import { MerchantDto } from '../../model/Merchant/merchant-dto';
import { MaterialTypeServices } from '../../core/MaterialType/material-type-services';
import { MerchantServices } from '../../core/Merchant/merchant-services';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { InvoiceComponent } from './invoice-component/invoice-component';
import { PaginationEntity } from '../../model/pagination-entity';
import { WarehouseDto } from '../../model/Warehouse/warehouse-dto';
import { WarehouseServices } from '../../core/Warehouse/warehouse-services';
import { ViewTransactionComponent } from './view-transaction-component/view-transaction-component';
import { TxnSearchDto } from '../../model/Transaction/txn-search-dto';
import { TrxFilter } from './trx-filter/trx-filter';
import { CommonService } from '../../core/common-service';
import { HeaderButton } from '../../model/header-button';
import { SystemInventoryServices } from '../../core/SystemInventory/system-inventory-services';
import { ResultInventory } from '../inventory/inventory-transactions-component/result-inventory/result-inventory';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [HTableComponent],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.scss'],
})
export class Transaction implements OnInit {

  selectedFromChild: string[] = [];
  /** Table Columns */
  columns = [
    'نوع المعاملة',
    'نوع المادة',
    'الكمية',
    'المخزن',
    'الإجمالي',
    'التاجر',
    'المبلغ المدفوع',
    'التاريخ'
  ];

  columnKeys = [
    'typeName',
    'materialTypeName',
    'quantity',
    'warehouseName',
    'totalAmount',
    'merchantName',
    'amountPaid',
    'formateDate'
  ];

  /** Data sources */
  transctionList: TransactionDto[] = [];
  materialTypeLst: MaterialTypeVM[] = [];
  merchantLst: MerchantDto[] = [];
  warehouseLst: WarehouseDto[] = [];
  pagination: TxnSearchDto = { pageIndex: 1, pageSize: 5, totalCount: 0 };
  /** Table actions */
  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      label: 'الفاتوره',
      type: 'invoice',
      style: 'btn btn-outline-primary btn-sm',
    },
    {
      icon: 'fa-solid fa-eye',
      label: 'التفاصيل',
      type: 'view',
      style: 'btn btn-outline-secondary btn-sm',
    }, {
      icon: 'fa fa-edit',
      label: 'تعديل',
      type: 'edit',
      style: 'btn btn-outline-success btn-sm',
    },
    {
      icon: 'fa fa-trash',
      label: 'حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm',
    },
  ];

  constructor(
    private transactionServices: TransactionServices,
    private dialog: MatDialog,
    private toast: ToastService,
    private materialService: MaterialTypeServices,
    private merchantService: MerchantServices,
    private warehouseService: WarehouseServices,
    private commonServices: CommonService,
    private systemInventoryServices: SystemInventoryServices
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadReferenceData();
    this.loadTransactions();
  }

  /** Load all lookup data (materials + merchants) */
  private async loadReferenceData(): Promise<void> {
    try {
      const [matRes, merRes, warRes] = await Promise.all([
        firstValueFrom(this.materialService.getAll()),
        firstValueFrom(this.merchantService.getAll()),
        firstValueFrom(this.warehouseService.getAll()),
      ]);

      if (matRes?.success) this.materialTypeLst = matRes.data ?? [];
      if (merRes?.success) this.merchantLst = merRes.data ?? [];
      if (warRes?.success) this.warehouseLst = warRes.data ?? [];
    } catch (err) {
      this.toast.error('فشل تحميل البيانات المرجعية.');
      console.error(err);
    }
  }

  /** Load all transactions */
  public loadTransactions(): void {
    this.transactionServices.search(this.pagination).subscribe({
      next: (res: ApiResponse<TransactionDto[]>) => {
        if (res.success && res.data) {
          this.transctionList = res.data.map((t) => ({
            ...t,
            typeName: t.type === 'Income' ? 'وارد' : 'صادر',
            totalAmount: !t.totalAmount ? t.quantity * t.pricePerUnit : t.totalAmount,
            formateDate: this.commonServices.formatDateOnly(t.createDate)
          }));

          this.pagination.totalCount = res.totalCount

          console.log(res, 'resalut')
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
  /** Table Actions */
  onTableAction(event: { action: string; row: TransactionDto }): void {
    if (event.action === 'edit') this.editTransaction(event.row);
    if (event.action === 'delete') this.deleteTransaction(event.row.id);
    if (event.action === 'invoice') this.InvoiceTransaction(event.row.id);
    if (event.action === 'view') this.viewTransaction(event.row);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize;
    console.log(this.pagination, 'pagination');
    this.loadTransactions();
  }

  /** Add / Edit / Delete / view logic */
  addTransaction(): void {
    const dialogRef = this.dialog.open(AddEditTransaction, {
      maxWidth: '60vw',
      maxHeight: '90vh',
      data: {
        isEdit: false,
        item: null,
        materialTypeLst: this.materialTypeLst,
        merchantLst: this.merchantLst,
        warehouseLst: this.warehouseLst,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTransactions();
    });
  }

  InvoiceTransaction(id: string) {
    this.dialog.open(InvoiceComponent, {
      panelClass: 'invoice-dialog',
      width: '90vw',
      height: '100vh',
      maxWidth: '90vw',
      maxHeight: '100vh',
      autoFocus: false,
      data: { Id: id },
    });
  }

  viewTransaction(item: TransactionDto) {
    this.dialog.open(ViewTransactionComponent, {
      width: 'auto',
      height: '90%',
      maxWidth: 'none',
      maxHeight: 'none',
      data: {
        item: item
      },
    })
  }

  editTransaction(item: TransactionDto): void {
    const dialogRef = this.dialog.open(AddEditTransaction, {
      width: '900px',
      maxHeight: '90vh',
      data: {
        isEdit: true,
        item,
        materialTypeLst: this.materialTypeLst,
        merchantLst: this.merchantLst,
        warehouseLst: this.warehouseLst,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadTransactions();
    });
  }

  deleteTransaction(id: string): void {
    this.toast.confirm('هل أنت متأكد من حذف هذا النوع؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.transactionServices.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم حذف المعاملة بنجاح.');
              this.loadTransactions();
            } else {
              this.toast.error('فشل حذف المعاملة.');
            }
          },
          error: () => this.toast.error('حدث خطأ أثناء حذف المعاملة.'),
        });
      }
    });
  }

  onFilter(): void {
    this.dialog.open(TrxFilter, {
      width: '800px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: {
        pageIngo: this.pagination
      }
    }).afterClosed().subscribe((filterData: TxnSearchDto) => {
      if (filterData) {
        this.pagination.fromDate = filterData.fromDate;
        this.pagination.toDate = filterData.toDate;

        this.pagination.isPaid = filterData.isPaid;
        this.pagination.isUnPaid = filterData.isUnPaid;

        this.pagination.merchantName = filterData.merchantName;
        this.pagination.warehouseeName = filterData.warehouseeName;
        this.pagination.materialTypeName = filterData.materialTypeName;
        this.loadTransactions();
      }
    });
  }
  onSelectionUpdated(ids: string[]) {
    this.selectedFromChild = ids;
  }

  actionButtons: HeaderButton[] = [
    { text: 'جرد', icon: 'fa-solid fa-file-invoice-dollar', type: 'primary', eventName: 'gard' },
  ];

  onHeaderButtonsClicked(action: string) {
    console.log('Action triggered:', action);

    if (action === 'gard') {
      this.gard();
    }
  }

  gard() {
    console.log("Selected values from child:", this.selectedFromChild);
    if (!this.selectedFromChild || this.selectedFromChild.length == 0) {
      this.toast.warning('اختر اولا المعاملات التي تريد جردها..!');
      return;
    }

    this.systemInventoryServices.GetTrnxReportByIds(this.selectedFromChild).subscribe((res: ApiResponse<any>) => {

      if (res.success && res.data) {
        this.dialog.open(ResultInventory,
          {
            width:'70vw',
            maxWidth:'90vw',
            height:'auto',
            maxHeight:'95vh',
            data:{
              Items : res.data
            }
          }
        )
      }
      else{
        this.toast.error(res.returnMsg)
      }
    })
  }

}
