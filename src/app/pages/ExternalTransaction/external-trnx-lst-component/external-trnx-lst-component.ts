import { Component, OnInit } from '@angular/core';
import { HTableComponent } from '../../../shared/Component/h-table/h-table.component';
import { ExternalTransactionDto } from '../../../model/ExternalTrnx/external-transaction-dto';
import { PaginationEntity } from '../../../model/pagination-entity';
import { TableAction } from '../../../model/table-action';
import { ExternalTrnxService } from '../../../core/ExternalTrnx/external-trnx-service';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';
import { DriverManagmentServices } from '../../../core/Drivers/driver-managment-services';
import { CommonService } from '../../../core/common-service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../core/shared/toast.service';
import { firstValueFrom } from 'rxjs';
import { ApiResponse } from '../../../model/api-response';
import { PageEvent } from '../../../model/page-event';
import { AddEditExternalTrnxComponent } from './add-edit-external-trnx-component/add-edit-external-trnx-component';
import { ViewExternalTrnxComponent } from './view-external-trnx-component/view-external-trnx-component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-external-trnx-list',
  standalone: true,
  imports: [HTableComponent,CommonModule],
  templateUrl: './external-trnx-lst-component.html',
  styleUrls: ['./external-trnx-lst-component.scss'],
})
export class ExternalTrnxLstComponent implements OnInit {

  /** Table Columns */
  columns = [
    'رقم المعاملة',
    'نوع المعاملة',
    'نوع المادة',
    'الكمية',
    'الإجمالي',
    'التاجر',
    'اسم السائق',
    'التاريخ'
  ];

  columnKeys = [
    'transactionIdentifier',
    'typeName',
    'materialTypeName',
    'quantity',
    'totalAmount',
    'merchantName',
    'driverName',
    'formattedDate'
  ];

  /** Data Sources */
  list: ExternalTransactionDto[] = [];
  merchantLst: any[] = [];
  materialTypeLst: any[] = [];
  driverLst: any[] = [];

  pagination: PaginationEntity = { pageIndex: 1, pageSize: 10, totalCount: 0 };

  /** Table Actions */
  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-eye',
      label: 'التفاصيل',
      type: 'view',
      style: 'btn btn-outline-secondary btn-sm',
    },
    {
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
    private externalService: ExternalTrnxService,
    private merchantService: MerchantServices,
    private materialService: MaterialTypeServices,
    private driverService: DriverManagmentServices,
    private common: CommonService,
    private dialog: MatDialog,
    private toast: ToastService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadLookups();
    this.loadData();
  }

  /** Load Merchant, Material, Driver Lists */
  private async loadLookups(): Promise<void> {
    try {
      const [mer, mat, drv] = await Promise.all([
        firstValueFrom(this.merchantService.getAll()),
        firstValueFrom(this.materialService.getAll()),
        firstValueFrom(this.driverService.getAll())
      ]);

      if (mer.success) this.merchantLst = mer.data ?? [];
      if (mat.success) this.materialTypeLst = mat.data ?? [];
      if (drv.success) this.driverLst = drv.data ?? [];

    } catch (error) {
      this.toast.error('فشل تحميل البيانات المرجعية.');
      console.error(error);
    }
  }

  /** Load Paging Data */
  loadData(): void {
    this.externalService.getAllPaged(this.pagination).subscribe({
      next: (res: ApiResponse<ExternalTransactionDto[]>) => {
        if (res.success && res.data) {

          this.list = res.data.map(t => ({
            ...t,
            typeName: t.type === "Income" ? 'وارد' : 'صادر',
            merchantName: this.resolveMerchant(t.merchantId),
            materialTypeName: this.resolveMaterial(t.materialTypeId),
            driverName: this.resolveDriver(t.driverId),
            formattedDate: this.common.formatDateOnly(t.externalTrnxDate)
          }));

          this.pagination.totalCount = res.totalCount;
        } else {
          this.toast.error('فشل تحميل المعاملات الخارجية.');
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء تحميل المعاملات.')
    });
  }

  resolveMerchant(id: string) {
    return this.merchantLst.find(x => x.id === id)?.name ?? '-';
  }

  resolveMaterial(id: string) {
    return this.materialTypeLst.find(x => x.id === id)?.name ?? '-';
  }

  resolveDriver(id?: string) {
    return this.driverLst.find(x => x.id === id)?.name ?? '-';
  }

  /** Pagination */
  onPageChange(e: PageEvent): void {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.loadData();
  }

  /** Table Actions */
  onTableAction(event: { action: string; row: ExternalTransactionDto }): void {
    if (event.action === 'view') this.view(event.row);
    if (event.action === 'edit') this.edit(event.row);
    if (event.action === 'delete') this.delete(event.row.id!);
  }

  /** CRUD */
  add(): void {
    this.dialog.open(AddEditExternalTrnxComponent, {
      maxWidth: '60vw',
      maxHeight: '95vh',
      data: {
        isEdit: false,
        item: null,
        materialTypeLst: this.materialTypeLst,
        merchantLst: this.merchantLst,
        driverLst: this.driverLst
      }
    }).afterClosed().subscribe(res => {
      if (res) this.loadData();
    });
  }

  edit(item: ExternalTransactionDto): void {
    this.dialog.open(AddEditExternalTrnxComponent, {
      maxWidth: '60vw',
      maxHeight: '95vh',
      data: {
        isEdit: true,
        item: item,
        materialTypeLst: this.materialTypeLst,
        merchantLst: this.merchantLst,
        driverLst: this.driverLst
      }
    }).afterClosed().subscribe(res => {
      if (res) this.loadData();
    });
  }

  view(item: ExternalTransactionDto): void {
    this.dialog.open(ViewExternalTrnxComponent, {
      width: '70vw',
      maxHeight: '90vh',
      data: { item }
    });
  }

  delete(id: string): void {
    this.toast.confirm('هل أنت متأكد من حذف المعاملة؟', 'نعم', 'إلغاء')
      .then(confirm => {
        if (confirm) {
          this.externalService.delete(id).subscribe({
            next: (res: ApiResponse<boolean>) => {
              if (res.success) {
                this.toast.success('تم حذف المعاملة بنجاح.');
                this.loadData();
              } else {
                this.toast.error('فشل حذف المعاملة.');
              }
            },
            error: () => this.toast.error('حدث خطأ أثناء حذف المعاملة.')
          });
        }
      });
  }
}
