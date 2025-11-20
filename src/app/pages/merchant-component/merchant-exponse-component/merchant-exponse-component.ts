import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";

import { ToastService } from '../../../core/shared/toast.service';
import { PaginationEntity } from '../../../model/pagination-entity';
import { ApiResponse } from '../../../model/api-response';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { CommonService } from '../../../core/common-service';
import { MerchantExpenseServices } from '../../../core/Merchant/merchant-expense-services';
import { MerchantExpenseDto } from '../../../model/Merchant/merchant-expense-dto';
import { AddEditMerchantExponseComponent } from './add-edit-merchant-exponse-component/add-edit-merchant-exponse-component';

@Component({
  selector: 'app-merchant-exponse',
  standalone: true,
  imports: [HTableComponent, HModalComponent],
  templateUrl: './merchant-exponse-component.html',
  styleUrl: './merchant-exponse-component.scss',
})
export class MerchantExponseComponent implements OnInit {

  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<MerchantExponseComponent>);
  private toast = inject(ToastService);
  private expenseService = inject(MerchantExpenseServices);
  private cdr = inject(ChangeDetectorRef);
  private commonServices = inject(CommonService);

  titleName = 'مصروفات التاجر';
  expenses: MerchantExpenseDto[] = [];

  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 };
  searchText = '';

  /** Columns */
  columns = ['السبب', 'القيمة', 'التاريخ'];
  columnKeys = ['notes', 'amount', 'formattedDate'];

  actions: TableAction[] = [
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
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.titleName = `مصروفات - ${this.data?.Title ?? ''}`;
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.GetAllByMerchantIdWithPagination(this.data?.merchantID,this.pagination).subscribe({
      next: (res: ApiResponse<MerchantExpenseDto[]>) => {
        if (res.success) {
          this.expenses = res.data?.map(item => ({
            ...item,
            formattedDate: this.commonServices.formatDateOnly(item.expenseDate)
          })) ?? [];

          this.pagination.totalCount = res.totalCount ?? 0;
          this.cdr.markForCheck();
        } else {
          this.toast.error(res.returnMsg);
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء جلب بيانات المصروفات')
    });
  }

  // onSearch(text: string): void {
  //   this.searchText = text;
  //   this.pagination.pageIndex = 1;
  //   this.loadExpenses();
  // }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize
    this.loadExpenses();
  }

  onTableAction(event: { action: string; row: MerchantExpenseDto }) {
    if (event.action === 'edit') this.editExpense(event.row);
    if (event.action === 'delete') this.deleteExpense(event.row.id);
  }

  addExpense() {
    this.dialog.open(AddEditMerchantExponseComponent, {
      width: '450px',
      data: { merchantId: this.data?.merchantID }
    }).afterClosed().subscribe(result => result && this.loadExpenses());
  }

  editExpense(row: MerchantExpenseDto) {
    this.dialog.open(AddEditMerchantExponseComponent, {
      width: '450px',
      data: { item: row, merchantId: this.data?.merchantID }
    }).afterClosed().subscribe(result => result && this.loadExpenses());
  }

  deleteExpense(id: string) {
    this.toast.confirm('هل تريد حذف هذا المصروف؟', 'نعم', 'إلغاء').then(confirmed => {
      if (confirmed) {
        this.expenseService.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم الحذف بنجاح');
              this.loadExpenses();
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
