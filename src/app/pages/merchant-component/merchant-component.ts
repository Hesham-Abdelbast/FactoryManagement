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
import { MeTtranscation } from './me-ttranscation/me-ttranscation';
import { PaginationEntity } from '../../model/pagination-entity';
import { MerchantExponseComponent } from './merchant-exponse-component/merchant-exponse-component';
import { MerchantFinanceComponent } from './merchant-finance-component/merchant-finance-component';

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
  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 }

  /** قائمة الأنواع */
  orgnialMerchantList: any;
  searchMerchantList: any;

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
      icon: 'fa fa-eye',
      iconColor: '',
      label: 'معاملاتي',
      type: 'show',
      style: 'btn btn-outline-primary btn-sm'
    },
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      iconColor: '',
      label: 'تمويل',
      type: 'finance',
      style: 'btn btn-outline-primary btn-sm'
    },
    {
      icon: 'fa fa-show',
      iconColor: '',
      label: 'سداد',
      type: 'Sdad',
      style: 'btn btn-outline-secondary btn-sm'
    },
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
      case 'show':
        this.show(event.row.id);
        break;
      case 'finance':
        this.finance(event.row.id,event.row.name);
        break;
      case 'Sdad':
        this.Sdad(event.row.id,event.row.name);
        break;
      case 'edit':
        this.editMerchant(event.row);
        break;
      case 'delete':
        this.deleteMerchant(event.row.id);
        break;
    }
  }

  finance(id: string,name:string){
    this.dialog.open(MerchantFinanceComponent, {
      width: '80vw',
      height: 'auto',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: { merchantID: id ,Title : name}
    });
  }

  Sdad(id: string,name:string){
    this.dialog.open(MerchantExponseComponent, {
      width: '80vw',
      height: 'auto',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: { merchantID: id ,Title : name}
    });
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize;
    this.loadMerchants();
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

  /** عرض المعاملات الخاصة بالتاجر */
  show(id: string) {
    this.dialog.open(MeTtranscation, {
      width: '80vw',
      height: 'auto',
      maxHeight: '90vh',
      maxWidth: '90vw',
      data: { merchantID: id }

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
    this.MerchantServices.getAllByPagination(this.pagination).subscribe((res: ApiResponse<MerchantDto[]>) => {
      if (res.success && res.data) {
        this.orgnialMerchantList = res.data;
        this.searchMerchantList = res.data;
        this.pagination.totalCount = res.totalCount;
        console.log(res.data)
      } else {
        this.toastService.error('فشل تحميل التجار.');
      }
    });
  }

  onSearch(event: string) {
    this.pagination.search = event;
    this.loadMerchants();
  }

}
