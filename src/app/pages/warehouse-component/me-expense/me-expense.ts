import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { ToastService } from '../../../core/shared/toast.service';
import { ApiResponse } from '../../../model/api-response';
import { WarehouseExpenseServices } from '../../../core/WarehouseExpense/warehouse-expense-services';
import { WarehouseExpenseDto } from '../../../model/Warehouse/warehouse-expense-dto';
import { AddEditExpenseComponent } from './add-edit-expense-component/add-edit-expense-component';
import { PaginationEntity } from '../../../model/pagination-entity';
import { CommonService } from '../../../core/common-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-me-expense',
  imports: [HTableComponent, HModalComponent,CommonModule],
  templateUrl: './me-expense.html',
  styleUrl: './me-expense.scss',
})
export class MeExpense implements OnInit {

  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<MeExpense>);
  private toast = inject(ToastService);
  private expenseService = inject(WarehouseExpenseServices);
  private cdr = inject(ChangeDetectorRef);
  private commonServices = inject(CommonService);
  totalAmount:number = 0
  titleName = 'المصروفات';
  expenses: WarehouseExpenseDto[] = [];
  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 }
  /** Table Columns */
  columns = [
    'السبب',
    'المبلغ',
    'التاريخ',
  ];

  columnKeys = [
    'notes',
    'amount',
    'formattedDate',
  ];

  actions: TableAction[] = [
    {
      icon: 'fa fa-edit',
      label: 'تعديل',
      type: 'edit',
      style: 'btn btn-outline-success btn-sm',
    },
    {
      icon: 'fa fa-trash',
      label: ' حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm',
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.titleName = `سجل مصروفات - ${this.data?.title ?? ''}`;
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getAllWithPagination(this.pagination).subscribe({
      next: (res: ApiResponse<WarehouseExpenseDto[]>) => {
        if (res.success && res.data) {
          this.expenses = res.data?.map(item => ({
            ...item,
            formattedDate: this.commonServices.formatDateOnly(item.createDate.toString())
          })) ?? [];
          this.totalAmount = res.data.reduce((sum, x) => sum + x.amount, 0);

          this.pagination.totalCount = res.totalCount;
          this.cdr.markForCheck();
        } else {
          this.toast.error(res.returnMsg);
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء جلب قائمة المصروفات')
    });


  }

  onTableAction(event: { action: string; row: WarehouseExpenseDto }): void {
    if (event.action === 'edit') this.editExpense(event.row);
    if (event.action === 'delete') this.deleteExpense(event.row.id);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize
    this.loadExpenses();
  }

  addExpense() {
    this.dialog.open(AddEditExpenseComponent, {
      width: '450px',
      data: {
        Id: this.data.Id
      }
    }).afterClosed().subscribe((result) => {
      if (result) this.loadExpenses();
    });
  }

  editExpense(row: WarehouseExpenseDto): void {
    this.dialog.open(AddEditExpenseComponent, {
      width: '450px',
      data: { item: row, Id: this.data.Id }
    }).afterClosed().subscribe((result) => {
      if (result) this.loadExpenses();
    });
  }

  deleteExpense(id: string): void {
    this.toast.confirm('هل أنت متأكد من الحذف؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.expenseService.delete(id).subscribe({
          next: (res: ApiResponse<boolean>) => {
            if (res.success) {
              this.toast.success('تم الحذف بنجاح');
              this.loadExpenses();
            } else {
              this.toast.error(res.returnMsg);
            }
          },
          error: () => this.toast.error('فشل في عملية الحذف')
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}