import { Component } from '@angular/core';
import { ApiResponse } from '../../model/api-response';
import { WarehouseDto } from '../../model/Warehouse/warehouse-dto';
import { TableAction } from '../../model/table-action';
import { WarehouseServices } from '../../core/Warehouse/warehouse-services';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../core/shared/toast.service';
import { PageEvent } from '../../model/page-event';
import { AddEditWarehouse } from './add-edit-warehouse/add-edit-warehouse';
import { HTableComponent } from "../../shared/Component/h-table/h-table.component";
import { LoaderService } from '../../core/shared/loader.service';
import { AsyncPipe } from '@angular/common';
import { PaginationEntity } from '../../model/pagination-entity';
import { WarehouseInventoryDto } from '../../model/Warehouse/warehouse-inventory-dto';
import { MeMaterials } from './me-materials/me-materials';
import { WarehouseInventoryServices } from '../../core/WarehouseInventory/warehouse-inventory-services';

@Component({
  selector: 'app-warehouse-component',
  imports: [HTableComponent],
  templateUrl: './warehouse-component.html',
  styleUrl: './warehouse-component.scss',
})
export class WarehouseComponent {
  /** Table Columns */
  columns = [
    'اسم المستودع',
    'الموقع',
    'اسم المدير',
    'رقم الهاتف',
    'البريد الإلكتروني',
    'تاريخ الإنشاء',
  ];

  columnKeys = [
    'name',
    'location',
    'managerName',
    'phoneNumber',
    'email',
    'createDate',
  ];

  /** Data sources */
  warehouseList: WarehouseDto[] = [];
  pagination: PaginationEntity = { pageIndex: 1, pageSize: 10, totalCount: 10 };
  /** Table actions */
  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      label: 'المواد',
      type: 'view',
      style: 'btn btn-outline-primary btn-sm',
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
    private warehouseServices: WarehouseServices,
    private warehouseInServices: WarehouseInventoryServices,
    private dialog: MatDialog,
    private toast: ToastService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadWarehouse();
  }

  public loadWarehouse(): void {
    this.warehouseServices.GetAllWithPagination(this.pagination).subscribe({
      next: (res: ApiResponse<WarehouseDto[]>) => {
        console.log(res, 'res');
        if (res.success && res.data) {
          this.warehouseList = res.data;
          this.pagination.totalCount = res.totalCount ?? 0;
        } else {
          this.toast.error('فشل في تحميل المستودعات .');
        }
      },
      error: (err) => {
        console.error(err);
        this.toast.error('حدث خطأ أثناء تحميل المستودعات .');
      },
    });
  }

  /** Table Actions */
  onTableAction(event: { action: string; row: WarehouseDto }): void {
    if (event.action === 'edit') this.editTransaction(event.row);
    if (event.action === 'delete') this.deleteTransaction(event.row.id);
    if (event.action === 'view') this.loadMaterials(event.row.id);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.pageIndex = pageEvent.pageIndex + 1;
    this.pagination.pageSize = pageEvent.pageSize;
    this.loadWarehouse();
  }

  /** Add / Edit / Delete / view logic */
  addTransaction(): void {
    const dialogRef = this.dialog.open(AddEditWarehouse, {
      width: '900px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadWarehouse();
    });
  }

  loadMaterials(warehouseId: string): void {
    this.warehouseInServices.getByWarehouseId(warehouseId).subscribe({
      next: (res: ApiResponse<WarehouseInventoryDto[]>) => {
        if (res.success) {
          const materials = res.data;
          this.dialog.open(MeMaterials, {
            width: '900px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            data: {
              materials: materials
            },
          });
        } else {
          this.toast.error('فشل في تحميل المواد.');
        }
      },
      error: () => {
        this.toast.error('حدث خطأ أثناء تحميل المواد.');
      }
    });
  }

  editTransaction(item: WarehouseDto): void {
    const dialogRef = this.dialog.open(AddEditWarehouse, {
      width: '900px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadWarehouse();
    });
  }

  deleteTransaction(id: string): void {
    this.toast.confirm('سيتم حذف جميع المعاملات المربوطه بالمستودع. هل أنت متأكد من حذف هذا المستودع', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.warehouseServices.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم حذف المستودع  بنجاح.');
              this.loadWarehouse();
            } else {
              this.toast.error('فشل حذف المستودع .');
            }
          },
          error: () => this.toast.error('حدث خطأ أثناء حذف المستودع .'),
        });
      }
    });
  }
}
