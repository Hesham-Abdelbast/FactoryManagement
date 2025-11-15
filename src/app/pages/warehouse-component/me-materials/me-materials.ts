import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { WarehouseServices } from '../../../core/Warehouse/warehouse-services';
import { ToastService } from '../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WarehouseInventoryDto } from '../../../model/Warehouse/warehouse-inventory-dto';
import { TableAction } from '../../../model/table-action';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { PageEvent } from '../../../model/page-event';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";
import { WarehouseInventoryAddEditComponent } from './warehouse-inventory-add-edit-component/warehouse-inventory-add-edit-component';
import { WarehouseDto } from '../../../model/Warehouse/warehouse-dto';
import { ApiResponse } from '../../../model/api-response';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';
import { WarehouseInventoryServices } from '../../../core/WarehouseInventory/warehouse-inventory-services';

@Component({
  selector: 'app-me-materials',
  imports: [HTableComponent, HModalComponent],
  templateUrl: './me-materials.html',
  styleUrl: './me-materials.scss',
})
export class MeMaterials implements OnInit {
  materials: WarehouseInventoryDto[] = [];
  titleName = 'مواد المستودع';
  /** Table Columns */
  columns = [
    'اسم المادة',
    'الكمية الحالية',
  ];

  columnKeys = [
    'materialTypeName',
    'currentQuantity',
  ];

  actions: TableAction[] = [
    // {
    //   icon: 'fa fa-edit',
    //   label: 'تعديل الكمية',
    //   type: 'edit',
    //   style: 'btn btn-outline-success btn-sm',
    // },
    {
      icon: 'fa fa-trash',
      label: ' حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm',
    }
  ];

  materialTypeLst: MaterialTypeVM[] = [];
  warehouseLst: WarehouseDto[] = [];

  constructor(
    private service: WarehouseServices,
    private matTypeServices: MaterialTypeServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<MeMaterials>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private warehouseInServices: WarehouseInventoryServices,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.titleName = `مواد المستودع - ${this.data.materials[0].warehouseName}`;
    this.GetAllMaterialTypes();
    this.GetAllWarehouses();
  }

  onTableAction(event: { action: string; row: WarehouseInventoryDto }): void {
    if (event.action === 'edit') this.editQuantity(event.row);
    if (event.action === 'delete') this.deleteMInv(event.row.id);
  }

  onPageChange(pageEvent: PageEvent): void {

  }
  addWInv() {
    this.dialog.open(WarehouseInventoryAddEditComponent, {
      width: '400px',
      data: {
        materialTypeLst: this.materialTypeLst,
        warehouseLst: this.warehouseLst
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        document.location.reload();
      }
    });
  }
  deleteMInv(id: string): void {
    this.toast.confirm('هل أنت متأكد من حذف هذا النوع؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.warehouseInServices.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم الحذف بنجاح');
              document.location.reload();
            } else {
              this.toast.error(res.returnMsg);
            }
          },
          error: () => this.toast.error('فشل في عملية الحذف')
        });
      }
    });
  }

  editQuantity(row: WarehouseInventoryDto): void {
    this.dialog.open(WarehouseInventoryAddEditComponent, {
      width: '400px',
      data: {
        item: row,
        materialTypeLst: this.materialTypeLst,
        warehouseLst: this.warehouseLst
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        document.location.reload();
      }
    });
  }

  private GetAllMaterialTypes(): void {
    this.matTypeServices.getAll().subscribe({
      next: (res: ApiResponse<MaterialTypeVM[]>) => {
        if (res.success) {
          this.materialTypeLst = res.data ?? [];
        } else {
          this.toast.error(res.returnMsg);
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء جلب أنواع المواد')
    });
    this.cdr.detectChanges();
  }

  private GetAllWarehouses(): void {
    this.service.getAll().subscribe({
      next: (res: ApiResponse<WarehouseDto[]>) => {
        if (res.success) {
          this.warehouseLst = res.data ?? [];
        } else {
          this.toast.error(res.returnMsg);
        }
      }
      ,
      error: () => this.toast.error('حدث خطأ أثناء جلب المخازن')
    });
    this.cdr.detectChanges();
  }
  clsoe(): void {
    this.dialogRef.close();
  }
}
