
import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";

import { ToastService } from '../../../core/shared/toast.service';
import { PaginationEntity } from '../../../model/pagination-entity';
import { ApiResponse } from '../../../model/api-response';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';

import { MerchantFinanceDto } from '../../../model/Merchant/merchant-finance-dto';
import { CommonService } from '../../../core/common-service';
import { MerchantFinance } from '../../../core/Merchant/merchant-finance';
import { AddEditMerchantFinanceComponent } from './add-edit-merchant-finance-component/add-edit-merchant-finance-component';


@Component({
  selector: 'app-merchant-finance',
  standalone: true,
  imports: [HTableComponent, HModalComponent],
  templateUrl: './merchant-finance-component.html',
  styleUrl: './merchant-finance-component.scss',
})
export class MerchantFinanceComponent implements OnInit {

  // DI
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<MerchantFinanceComponent>);
  private financeService = inject(MerchantFinance);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);
  private commonService = inject(CommonService);

  titleName = 'المعاملات المالية';
  finance: MerchantFinanceDto[] = [];

  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 };

  // Columns for table
  columns = ['القيمة', 'التاريخ', 'ملاحظات'];
  columnKeys = ['amount', 'formattedDate', 'notes'];

  // Table actions
  actions: TableAction[] = [
    {
      icon: 'fa fa-edit',
      label: 'تعديل',
      type: 'edit',
      style: 'btn btn-outline-success btn-sm'
    },
    {
      icon: 'fa fa-trash',
      label: 'حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm'
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.titleName = `حسابات مالية - ${this.data?.Title ?? ''}`;
    this.loadFinance();
  }

  loadFinance() {
    this.financeService.getAllByMerchantIdWithPagination(this.data?.merchantID, this.pagination)
    .subscribe({
      next: (res: ApiResponse<MerchantFinanceDto[]>) => {
        if (res.success) {
          this.finance = res.data?.map(item => ({
            ...item,
            formattedDate: this.commonService.formatDateOnly(item.operationDate)
          })) ?? [];

          this.pagination.totalCount = res.totalCount ?? 0;
          this.cdr.markForCheck();
        } else this.toast.error(res.returnMsg);
      },
      error: () => this.toast.error('حدث خطأ أثناء جلب البيانات')
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageIndex = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.loadFinance();
  }

  onTableAction(event: { action: string; row: MerchantFinanceDto }) {
    if (event.action === 'edit') this.editFinance(event.row);
    if (event.action === 'delete') this.deleteFinance(event.row.id);
  }

  addFinance() {
    this.dialog.open(AddEditMerchantFinanceComponent, {
      width: '450px',
      data: { merchantId: this.data?.merchantID }
    }).afterClosed().subscribe(result => result && this.loadFinance());
  }

  editFinance(row: MerchantFinanceDto) {
    this.dialog.open(AddEditMerchantFinanceComponent, {
      width: '450px',
      data: { item: row, merchantId: this.data?.merchantID }
    }).afterClosed().subscribe(result => result && this.loadFinance());
  }

  deleteFinance(id: string) {
    this.toast.confirm('هل تريد حذف العملية؟', 'نعم', 'إلغاء')
    .then(confirm => {
      if (confirm) {
        this.financeService.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم الحذف بنجاح');
              this.loadFinance();
            } else this.toast.error(res.returnMsg);
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
