import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';
import { PageEvent } from '../../../../model/page-event';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { AddEditExpenseCashComponent } from '../add-edit-expense-cash-component/add-edit-expense-cash-component';
import { EmployeePersonalExpenseDto } from '../../../../model/Employee/employee-personal-expense-dto';

@Component({
  selector: 'app-employee-personal-expense',
  imports: [HTableComponent, HModalComponent],
  templateUrl: './employee-personal-expense-component.html',
  styleUrl: './employee-personal-expense-component.scss',
})
export class EmployeePersonalExpenseComponent implements OnInit {

  title: string = 'مصروفات الموظف ';
  data: EmployeePersonalExpenseDto[] = [];

  pagination: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }

  empId: string = '';

  /** Table Columns */
  columns = ['المبلغ', 'ملاحظات', 'تاريخ المصروف'];
  columnKeys = ['amount', 'note', 'createDate'];

  /** Table Actions */
  actions: TableAction[] = [
    { icon: 'fa fa-edit', label: 'تعديل', type: 'edit', style: 'btn btn-outline-success btn-sm' },
    { icon: 'fa fa-trash', label: 'حذف', type: 'delete', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(
    private service: EmployeeManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeePersonalExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title += this.dialogData.Name;
    if (this.dialogData.Id)
      this.getAll();
  }

  /** Fetch Data */
  getAll() {
    this.empId = this.dialogData.Id;

    this.service.getPersonalExpenses(this.empId, this.pagination)
      .subscribe((res: ApiResponse<EmployeePersonalExpenseDto[]>) => {
        if (res.success && res.data) {
          this.data = res.data.map(item => ({
            ...item,
            createDate: item.createDate?.split('T')[0]
          }));

          this.pagination.totalCount = res.totalCount;
          this.cdr.detectChanges();
        } else {
          this.toast.error(res.returnMsg);
        }
      });
  }

  /** Table Event Handler */
  onTableAction(event: { action: string; row: EmployeePersonalExpenseDto }) {
    if (event.action === 'edit') this.openDialog(true, event.row);
    else if (event.action === 'delete') this.delete(event.row.id);
  }

  /** Open Add/Edit Modal */
  openDialog(isEdit: boolean, item?: EmployeePersonalExpenseDto) {
    const dialogRef = this.dialog.open(AddEditExpenseCashComponent, {
      width: '750px',
      data: { isEdit, type: 'expense', item }
    });

    dialogRef.afterClosed().subscribe(res => res && this.getAll());
  }

  /** Delete Item */
  delete(id: string) {
    this.toast.confirm('هل تريد حذف المصروف؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.service.deletePersonalExpense(id).subscribe(res => {
          res.success ? this.toast.success('تم الحذف بنجاح') : this.toast.error('فشل الحذف');
          this.getAll();
        });
      }
    });
  }

  /** Add New */
  onAdd() {
    const dialogRef = this.dialog.open(AddEditExpenseCashComponent, {
      width: '750px',
      data: { isEdit: false, type: 'expense', employeeId: this.dialogData.Id }
    });

    dialogRef.afterClosed().subscribe(res => res && this.getAll());
  }

  /** Pagination */
  onPageChange(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.getAll();
  }

  close() {
    this.dialogRef.close(false);
  }
}
