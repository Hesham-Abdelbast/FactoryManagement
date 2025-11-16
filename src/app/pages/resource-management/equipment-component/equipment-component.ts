import { Component } from '@angular/core';
import { ApiResponse } from '../../../model/api-response';
import { EquipmentDto } from '../../../model/Equipments/equipment-dto';
import { EquipmentManagementService } from '../../../core/Equipments/equipment-management-service';
import { ToastService } from '../../../core/shared/toast.service';
import { PaginationEntity } from '../../../model/pagination-entity';
import { MatDialog } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { AddEditEquipment } from './add-edit-equipment/add-edit-equipment';

@Component({
  selector: 'app-equipment-component',
  imports: [HTableComponent],
  templateUrl: './equipment-component.html',
  styleUrl: './equipment-component.scss',
})
export class EquipmentComponent {
  categoryLabels: { [key: string]: string } = {
    Internal: 'معدة داخلية',
    External: 'معدة خارجية'
  };
  eqpsData: EquipmentDto[] = [];
  paginationeqps: PaginationEntity = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0
  }
  /** أعمدة الجدول */
  columns = ['اسم المعدة', 'نوع المعدة'];
  columnKeys = ['name', 'categoryName'];

  constructor(
    private eqpServices: EquipmentManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.GetAllEquipment();
  }
  /** إجراءات الجدول */
  actions: TableAction[] = [
    {
      icon: 'fa fa-edit',
      iconColor: '',
      label: 'تعديل',
      type: 'edit',
      style: 'btn btn-outline-success btn-sm'
    },
    {
      icon: 'fa fa-trash',
      iconColor: '',
      label: 'حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm'
    }
  ];

  /** التعامل مع الأحداث من الجدول */
  onTableAction(event: { action: string; row: EquipmentDto }) {
    switch (event.action) {
      case 'edit':
        this.editeqps(event.row);
        break;
      case 'delete':
        this.deleteeqps(event.row.id);
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.paginationeqps.pageIndex = pageEvent.pageIndex;
    this.paginationeqps.pageSize = pageEvent.pageIndex;
    this.GetAllEquipment();
  }


  editeqps(eqps: EquipmentDto) {
    const dialogRef = this.dialog.open(AddEditEquipment, {
      width: '900px',
      height: 'auto',
      data: { isEdit: true, Item: eqps }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllEquipment();
    });
  }

  deleteeqps(id: string) {
    this.toast.confirm('هل أنت متأكد من حذف هذا المعدة', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.eqpServices.deleteEquipment(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم حذف المعدة بنجاح.');
            this.GetAllEquipment();
          } else {
            this.toast.error('فشل حذف المعدة.');
          }
        });
      }
    });
  }

  addEqps() {
    const dialogRef = this.dialog.open(AddEditEquipment, {
      width: '900px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllEquipment();
    });
  }

  GetAllEquipment() {
    this.eqpServices.getAllEquipmentsWithPagination(this.paginationeqps).subscribe((res: ApiResponse<EquipmentDto[]>) => {
      if (res.success && res.data) {
       this.eqpsData = res.data.map(item => ({
          ...item,
          categoryName: this.categoryLabels[item.category] ?? item.category
        }));
        console.log(this.eqpsData)
      }
      else {
        this.toast.error(res.returnMsg);
      }
    });
  }
}
