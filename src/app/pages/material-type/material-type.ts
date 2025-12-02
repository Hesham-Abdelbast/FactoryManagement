import { Component, OnInit } from '@angular/core';
import { HTableComponent } from "../../shared/Component/h-table/h-table.component";
import { ApiResponse } from '../../model/api-response';
import { MaterialTypeVM } from '../../model/MaterialType/material-type-vm';
import { TableAction } from '../../model/table-action';
import { PageEvent } from '../../model/page-event';
import { MatDialog } from '@angular/material/dialog';
import { AddEditMaterialType } from './add-edit-material-type/add-edit-material-type';
import { ToastService } from '../../core/shared/toast.service';
import { MaterialTypeServices } from '../../core/MaterialType/material-type-services';
import { PaginationEntity } from '../../model/pagination-entity';

@Component({
  selector: 'app-material-type',
  standalone: true,
  imports: [HTableComponent],
  templateUrl: './material-type.html',
  styleUrls: ['./material-type.scss']
})
export class MaterialType implements OnInit {
  pagination:PaginationEntity={pageIndex:1,pageSize:10,totalCount:0}
  /** أعمدة الجدول */
  columns = ['الاسم', 'الوصف'];
  columnKeys = ['name', 'description'];

  /** قائمة الأنواع */
  materialList: any;

  /** عدد السجلات */
  total = 0;

  constructor(
    private materialTypeServices: MaterialTypeServices,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.loadMaterialTypes();

  }

  ngOnInit(): void {
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
  onTableAction(event: { action: string; row: MaterialTypeVM }) {
    switch (event.action) {
      case 'edit':
        this.editMaterialType(event.row);
        break;
      case 'delete':
        this.deleteMaterialType(event.row.id);
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize;
    this.loadMaterialTypes();
  }

  /** إضافة نوع جديد */
  addMaterialType() {
    const dialogRef = this.dialog.open(AddEditMaterialType, {
      width: '900px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.loadMaterialTypes();

    });
  }

  /** تعديل نوع مادة */
  editMaterialType(item: MaterialTypeVM) {
    console.log(item)
    const dialogRef = this.dialog.open(AddEditMaterialType, {
      width: '900px',
      height: 'auto',
      data: { isEdit: true, Item: item }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.loadMaterialTypes();

    });
  }

  /** تعديل نوع مادة */
  editMaterialWight(item: MaterialTypeVM) {
    console.log(item)
  }
  
  /** حذف نوع مادة */
  deleteMaterialType(id: string) {
    console.log(id)
    this.toastService.confirm('هل أنت متأكد من حذف هذا النوع؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.materialTypeServices.delete(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toastService.success('تم حذف النوع بنجاح.');
            this.loadMaterialTypes();
          } else {
            this.toastService.error('فشل حذف النوع.');
          }
        });
      }
    });
  }

  /** تحميل جميع الأنواع */
  public loadMaterialTypes() {
    this.materialTypeServices.getAllWithPagination(this.pagination).subscribe((res: ApiResponse<MaterialTypeVM[]>) => {
      if (res.success && res.data) {
        this.materialList = res.data;
        this.total = res.data.length;
        console.log(res.data)
      } else {
        this.toastService.error('فشل تحميل الأنواع.');
      }
    });
  }
}
