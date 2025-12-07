import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';
import { PageEvent } from '../../../../model/page-event';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { EquipmentExpenseDto } from '../../../../model/Equipments/equipment-expense-dto';
import { EquipmentManagementService } from '../../../../core/Equipments/equipment-management-service';
import { AddEditEquipmentExpenseComponent } from './add-edit-equipment-expense-component/add-edit-equipment-expense-component';
import { CommonService } from '../../../../core/common-service';

@Component({
  selector: 'app-equipment-expense',
  imports: [HTableComponent, HModalComponent],
  templateUrl: './equipment-expense-component.html',
  styleUrl: './equipment-expense-component.scss',
})

export class EquipmentExpenseComponent implements OnInit {

  title: string = 'مصروفات المعدة ';
  data: EquipmentExpenseDto[] = [];

  pagination: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }

  equipmentId: string = '';

  /** Table Columns */
  columns = ['نوع المصروف', 'المبلغ', 'التاريخ'];
  columnKeys = ['typeLabel', 'amount', 'formattedDate'];

  /** Table Actions */
  actions: TableAction[] = [
    { icon: 'fa fa-edit', label: 'تعديل', type: 'edit', style: 'btn btn-outline-success btn-sm' },
    { icon: 'fa fa-trash', label: 'حذف', type: 'delete', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(
    private service: EquipmentManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EquipmentExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private cdr: ChangeDetectorRef,
    private commonServices: CommonService
  ) {}

  ngOnInit(): void {
    this.title += this.dialogData?.Name ?? '';
    if (this.dialogData?.Id)
      this.getAll();
  }

  getAll() {
    this.equipmentId = this.dialogData.Id;

    this.service.getEquipmentExpenses(this.equipmentId, this.pagination)
      .subscribe((res: ApiResponse<EquipmentExpenseDto[]>) => {
        if (res.success && res.data) {
          this.data = res.data.map(item => ({
            ...item,
            typeLabel: EquipmentExpenseTypeArabic[item.type],
            formattedDate: this.commonServices.formatDateOnly(item.createDate.toString())
          }));

          this.pagination.totalCount = res.totalCount;
          this.cdr.detectChanges();
        } else {
          this.toast.error(res.returnMsg);
        }
      });
  }

  onTableAction(event: { action: string; row: EquipmentExpenseDto }) {
    if (event.action === 'edit') this.openDialog(true, event.row);
    else if (event.action === 'delete') this.delete(event.row.id);
  }

  openDialog(isEdit: boolean, item?: EquipmentExpenseDto) {
    const dialogRef = this.dialog.open(AddEditEquipmentExpenseComponent, {
      width: '750px',
      data: { isEdit, item, equipmentId: this.equipmentId }
    });

    dialogRef.afterClosed().subscribe(res => res && this.getAll());
  }

  /** Delete Item */
  delete(id: string) {
    this.toast.confirm('هل تريد حذف المصروف؟', 'نعم', 'إلغاء')
      .then((confirmed) => {
        if (confirmed) {
          this.service.deleteEquipmentExpense(id).subscribe(res => {
            res.success ? this.toast.success('تم الحذف بنجاح') : this.toast.error('فشل الحذف');
            this.getAll();
          });
        }
      });
  }

  /** Add */
  onAdd() {
    this.openDialog(false);
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
export const EquipmentExpenseTypeArabic: Record<string, string> = {
  ['Maintenance']: 'صيانة',
  ['Fuel']: 'وقود',
  ['Oil']: 'زيت',
};