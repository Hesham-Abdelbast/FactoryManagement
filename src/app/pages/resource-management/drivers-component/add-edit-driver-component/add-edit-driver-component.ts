import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/shared/toast.service';
import { ApiResponse } from '../../../../model/api-response';
import { DriverDto } from '../../../../model/Drivers/driver-dto';
import { DriverManagmentServices } from '../../../../core/Drivers/driver-managment-services';

@Component({
  selector: 'app-add-edit-driver',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-driver-component.html',
  styleUrls: ['./add-edit-driver-component.scss'],
})
export class AddEditDriverComponent {
  
  driverForm!: FormGroup;
  driver?: DriverDto;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private driverService: DriverManagmentServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data?.isEdit) {
      this.isEditMode = true;
      this.driver = this.data.Item;

      this.driverForm = this.fb.group({
        id: [this.driver?.id],
        name: [this.driver?.name, [Validators.required, Validators.maxLength(50)]],
        phoneNumber: [this.driver?.phoneNumber],
        licenseNumber: [this.driver?.licenseNumber],
      });

    } else {

      this.driverForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        phoneNumber: [''],
        licenseNumber: [''],
      });

    }
  }

  onSubmit() {
    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      return;
    }

    const driver: DriverDto = this.driverForm.value;

    if (this.isEditMode)
      this.update(driver);
    else 
      this.create(driver);
  }

  create(driver: DriverDto) {
    this.driverService.addDriver(driver).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success("تمت إضافة السائق بنجاح.");
        this.dialogRef.close(true);
      } else {
        this.toast.error("فشل في إضافة السائق.");
      }
    });
  }

  update(driver: DriverDto) {
    driver.id = this.data.Item.id;

    this.driverService.updateDriver(driver).subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success("تم تحديث بيانات السائق بنجاح.");
        this.dialogRef.close(true);
      } else {
        this.toast.error("فشل في تحديث بيانات السائق.");
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
