import { Component, OnInit } from '@angular/core';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { PaginationEntity } from '../../../model/pagination-entity';
import { ApiResponse } from '../../../model/api-response';
import { ToastService } from '../../../core/shared/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { DriverDto } from '../../../model/Drivers/driver-dto';
import { DriverManagmentServices } from '../../../core/Drivers/driver-managment-services';
import { AddEditDriverComponent } from './add-edit-driver-component/add-edit-driver-component';
import { TravelComponent } from './travel-component/travel-component';
import { DriverExpenseComponent } from './driver-expense-component/driver-expense-component';

// Dialogs for driver CRUD


@Component({
  selector: 'app-drivers-component',
  imports: [HTableComponent],
  templateUrl: './drivers-component.html',
  styleUrl: './drivers-component.scss',
})
export class DriversComponent implements OnInit {

  DriversData: DriverDto[] = [];

  pagination: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  };

  /** Table columns */
  columns = ['الاسم', 'رقم الهاتف', 'رقم الرخصة', 'الرصيد المالي'];
  columnKeys = ['name', 'phoneNumber', 'licenseNumber', 'moneyBalance'];

  constructor(
    private driverService: DriverManagmentServices,
    private toast: ToastService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.GetDrivers();
  }

  /** Table Actions */
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
    },
    {
      icon: 'fa fa-dollar-sign',
      label: 'سلفة',
      type: 'CashAdvance',
      style: 'btn btn-outline-primary btn-sm'
    },
    {
      icon: 'fa-solid fa-signs-post',
      label: 'اضافة طريق',
      type: 'travel',
      style: 'btn btn-outline-primary btn-sm'
    }
  ];

  /** Event handler for actions */
  onTableAction(event: { action: string; row: DriverDto }) {
    switch (event.action) {
      case 'edit':
        this.editDriver(event.row);
        break;
      case 'delete':
        this.deleteDriver(event.row.id);
        break;
      case 'CashAdvance':
        this.openCashAdvance(event.row.id, event.row.name);
        break;
      case 'travel':
        this.travel(event.row.id, event.row.name);
        break;
    }
  }

  /** Pagination */
  onPageChange(pageEvent: PageEvent) {
    this.pagination.pageIndex = pageEvent.pageIndex;
    this.pagination.pageSize = pageEvent.pageSize;
    this.GetDrivers();
  }

  openCashAdvance(id: string, name: string) {
     this.dialog.open(DriverExpenseComponent, {
      width: '70vw',
      maxWidth:'90vw',
      data: { 
        driverId:id,
        name:name
       }
    });
  }

  travel(id: string, name: string) {
    this.dialog.open(TravelComponent, {
      width: '70vw',
      maxWidth:'90vw',
      data: {  
        driverId:id,
        name:name
      }
    });
  }

  editDriver(driver: DriverDto) {
    const dialogRef = this.dialog.open(AddEditDriverComponent, {
      width: '800px',
      data: { isEdit: true, Item: driver }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) this.GetDrivers();
    });
  }

  deleteDriver(id: string) {
    this.toast.confirm('هل أنت متأكد من حذف هذا السائق؟', 'نعم', 'إلغاء').then(confirmed => {
      if (confirmed) {
        this.driverService.deleteDriver(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم حذف السائق بنجاح.');
            this.GetDrivers();
          } else {
            this.toast.error('فشل حذف السائق.');
          }
        });
      }
    });
  }

  addDriver() {
    const dialogRef = this.dialog.open(AddEditDriverComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) this.GetDrivers();
    });
  }

  /** Load drivers */
  GetDrivers() {
    this.driverService.getAllDrivers(this.pagination).subscribe((res: ApiResponse<DriverDto[]>) => {
      if (res.success && res.data) {
        this.DriversData = res.data;
        this.pagination.totalCount = res.data.length;
      } else {
        this.toast.error(res.returnMsg);
      }
    });
  }
}
