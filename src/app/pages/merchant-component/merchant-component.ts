import { Component } from '@angular/core';
import { MerchantServices } from '../../core/Merchant/merchant-services';
import { ToastService } from '../../core/shared/toast.service';
import { TableAction } from '../../model/table-action';
import { MerchantDto } from '../../model/Merchant/merchant-dto';
import { AddEditMerchant } from './add-edit-merchant/add-edit-merchant';
import { ApiResponse } from '../../model/api-response';
import { HTableComponent } from '../../shared/Component/h-table/h-table.component';
import { PageEvent } from '../../model/page-event';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-merchant-component',
  imports: [HTableComponent],
  templateUrl: './merchant-component.html',
  styleUrl: './merchant-component.scss',
})
export class MerchantComponent {
/** أعمدة الجدول */
 columns = ['الاسم', 'رقم الهاتف', 'البريد الإلكتروني', 'العنوان'];
columnKeys = ['name', 'phone', 'email', 'address'];


  /** قائمة الأنواع */
  merchantList: any;

  /** عدد السجلات */
  total = 0;

  constructor(
    private MerchantServices: MerchantServices,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.loadMerchants();

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
  onTableAction(event: { action: string; row: MerchantDto }) {
    switch (event.action) {
      case 'edit':
        this.editMerchant(event.row);
        break;
      case 'delete':
        this.deleteMerchant(event.row.id);
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    const start = (pageEvent.pageIndex - 1) * pageEvent.pageSize;
    const end = start + pageEvent.pageSize;
    console.log(`عرض البيانات من ${start} إلى ${end}`);
  }

  /** إضافة نوع جديد */
  addMerchant() {
    const dialogRef = this.dialog.open(AddEditMerchant, {
      width: '900px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.loadMerchants();

    });
  }

  /** تعديل نوع مادة */
  editMerchant(item: MerchantDto) {
    console.log(item)
    const dialogRef = this.dialog.open(AddEditMerchant, {
      width: '900px',
      height: 'auto',
      data: { isEdit: true, Item: item }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.loadMerchants();

    });
  }

  /** حذف نوع مادة */
  deleteMerchant(id: string) {
    console.log(id)
    this.toastService.confirm('هل أنت متأكد من حذف هذا التاجر', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.MerchantServices.delete(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toastService.success('تم حذف التاجر بنجاح.');
            this.loadMerchants();
          } else {
            this.toastService.error('فشل حذف التاجر.');
          }
        });
      }
    });
  }

  /** تحميل جميع الأنواع */
  public loadMerchants() {
    this.MerchantServices.getAll().subscribe((res: ApiResponse<MerchantDto[]>) => {
      if (res.success && res.data) {
        this.merchantList = res.data;
        this.total = res.data.length;
        console.log(res.data)
      } else {
        this.toastService.error('فشل تحميل التجار.');
      }
    });
  }
}
