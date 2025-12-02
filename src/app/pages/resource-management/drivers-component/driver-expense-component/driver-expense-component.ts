import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { ToastService } from '../../../../core/shared/toast.service';
import { DriverManagmentServices } from '../../../../core/Drivers/driver-managment-services';
import { DriverExpenseDto } from '../../../../model/Drivers/driver-exponse-dto';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { ApiResponse } from '../../../../model/api-response';
import { AddEditDriverExpenseComponent } from './add-edit-driver-expense-component/add-edit-driver-expense-component';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { PageEvent } from '../../../../model/page-event';
import { CommonService } from '../../../../core/common-service';

@Component({
  selector: 'app-driver-expense-component',
  standalone: true,
  imports: [HTableComponent, HModalComponent],
  templateUrl: './driver-expense-component.html',
  styleUrl: './driver-expense-component.scss'
})
export class DriverExpenseComponent implements OnInit {

  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<DriverExpenseComponent>);
  private toast = inject(ToastService);
  private expenseService = inject(DriverManagmentServices);
  private commonServices = inject(CommonService);
  private cdr = inject(ChangeDetectorRef);
  title = '';
  expenses: DriverExpenseDto[] = [];

  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 };

  columns = ['القيمة', 'الملاحظة', 'التاريخ'];
  columnKeys = ['amount', 'notes', 'formattedDate'];

  actions: TableAction[] = [
    { type: 'edit', label: 'تعديل', icon: 'fa fa-edit', style: 'btn btn-outline-success btn-sm' },
    { type: 'delete', label: 'حذف', icon: 'fa fa-trash', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.title = `مصروفات السائق - ${this.data?.name ?? ''}`;
    this.loadData();
  }

  loadData() {
    this.expenseService.getAllExpensesByDriverId(this.data?.driverId, this.pagination).subscribe({
      next: (res: ApiResponse<DriverExpenseDto[]>) => {
        if (res.success && res.data) {
          this.expenses = res.data.map(item => ({
            ...item,
            formattedDate: this.commonServices.formatDateOnly(item.expenseDate.toString())
          }))
          this.pagination.totalCount = res.totalCount ?? 0;

          this.cdr.markForCheck();
        }
      }
    });
  }

  onPageChange(ev: PageEvent) {
    this.pagination.pageIndex = ev.pageIndex;
    this.pagination.pageSize = ev.pageSize;
    this.loadData();
  }

  onTableAction(ev: { action: string; row: DriverExpenseDto }) {
    if (ev.action === 'edit') this.editExpense(ev.row);
    else if (ev.action === 'delete') this.deleteExpense(ev.row.id);
  }

  addExpense() {
    this.dialog.open(AddEditDriverExpenseComponent, {
      width: '450px',
      data: { driverId: this.data?.driverId }
    }).afterClosed().subscribe(r => r && this.loadData());
  }

  editExpense(row: DriverExpenseDto) {
    this.dialog.open(AddEditDriverExpenseComponent, {
      width: '450px',
      data: { item: row, driverId: this.data?.driverId }
    }).afterClosed().subscribe(r => r && this.loadData());
  }

  deleteExpense(id: string) {
    this.toast.confirm('هل تريد حذف المصروف؟', 'نعم', 'إلغاء').then(ok => {
      if (ok) {
        this.expenseService.deleteExpense(id).subscribe(res => {
          if (res.success) {
            this.toast.success('تم الحذف بنجاح');
            this.loadData();
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
