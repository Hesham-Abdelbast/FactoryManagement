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
      {
        icon: 'fa fa-edit',
        label: 'تعديل الكمية',
        type: 'edit',
        style: 'btn btn-outline-success btn-sm',
      }
    ];

  constructor(
    private service: WarehouseServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<MeMaterials>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.titleName = `مواد المستودع - ${this.data.materials[0].warehouseName}`;
  }

   onTableAction(event: { action: string; row: WarehouseInventoryDto }): void {
      if (event.action === 'edit') this.editQuantity(event.row);
    }
  
    onPageChange(pageEvent: PageEvent): void {
      
    }

    editQuantity(row: WarehouseInventoryDto): void {
      this.dialog.open(WarehouseInventoryAddEditComponent, {
        width: '400px',
        data: { item: row }
      })
    }

    clsoe(): void {
      this.dialogRef.close();
    }
}
