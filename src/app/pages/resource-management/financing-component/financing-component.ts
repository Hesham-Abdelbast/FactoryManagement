import { Component } from '@angular/core';
import { PageEvent } from '../../../model/page-event';
import { FinancingDto } from '../../../model/financing-dto';
import { PaginationEntity } from '../../../model/pagination-entity';
import { FinancingService } from '../../../core/Financing/financing-service';
import { ToastService } from '../../../core/shared/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { ApiResponse } from '../../../model/api-response';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { AddEditFinancing } from './add-edit-financing/add-edit-financing';

@Component({
  selector: 'app-financing-component',
  imports: [HTableComponent],
  templateUrl: './financing-component.html',
  styleUrl: './financing-component.scss',
})
export class FinancingComponent {
  eqpsData: FinancingDto[] = [];
  paginationeqps: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }
  /** أعمدة الجدول */
  columns = ['اسم الممول', 'اجمالي التمويل'];
  columnKeys = ['providerName', 'amount'];

  constructor(
    private financingServices: FinancingService,
    private toast: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.GetAllFinancing();
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
  onTableAction(event: { action: string; row: FinancingDto }) {
    switch (event.action) {
      case 'edit':
        this.editFinancing(event.row);
        break;
      case 'delete':
        this.deleteFinancing(event.row.id ?? '');
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.paginationeqps.pageIndex = pageEvent.pageIndex;
    this.paginationeqps.pageSize = pageEvent.pageIndex;
    this.GetAllFinancing();
  }


  editFinancing(financing: FinancingDto) {
    const dialogRef = this.dialog.open(AddEditFinancing, {
      width: '900px',
      height: 'auto',
      maxHeight: '90vh',
      data: { isEdit: true, Item: financing }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllFinancing();
    });
  }

  deleteFinancing(id: string) {
    this.toast.confirm('هل أنت متأكد من حذف هذا التمويل', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.financingServices.delete(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم حذف التمويل بنجاح.');
            this.GetAllFinancing();
          } else {
            this.toast.error('فشل حذف التمويل.');
          }
        });
      }
    });
  }

  addEqps() {
    const dialogRef = this.dialog.open(AddEditFinancing, {
      width: '900px',
      height: 'auto',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllFinancing();
    });
  }

  GetAllFinancing() {
    this.financingServices.getAllWithPagination(this.paginationeqps).subscribe((res: ApiResponse<FinancingDto[]>) => {
      if (res.success && res.data) {
        this.eqpsData = res.data
        this.paginationeqps.totalCount = res.totalCount ?? 0;
      }
      else {
        this.toast.error(res.returnMsg);
      }
    });
  }
}
