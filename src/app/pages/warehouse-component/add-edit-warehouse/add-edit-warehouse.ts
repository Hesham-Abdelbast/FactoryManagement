import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { WarehouseDto } from '../../../model/Warehouse/warehouse-dto';
import { ApiResponse } from '../../../model/api-response';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseServices } from '../../../core/Warehouse/warehouse-services';
import { ToastService } from '../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-warehouse',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-warehouse.html',
  styleUrl: './add-edit-warehouse.scss',
})
export class AddEditWarehouse {
  warehouseForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private service: WarehouseServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditWarehouse>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data?.isEdit ?? false;
    this.createForm();
  }

  createForm(): void {
    const warehouse = this.data.item;

    this.warehouseForm = this.fb.group({
      id: [warehouse?.id ?? null],
      name: [warehouse?.name ?? '', Validators.required],
      location: [warehouse?.location ?? ''],
      managerName: [warehouse?.managerName ?? ''],
      phoneNumber: [
        warehouse?.phoneNumber ?? '',
        [Validators.pattern(/^[0-9+()\- ]{6,20}$/)]
      ],
      email: [
        warehouse?.email ?? '',
        Validators.email
      ],
      createDate: [warehouse?.createDate ?? new Date()]
    });

    this.cdr.detectChanges();
  }

  onSubmit(): void {
    if (this.warehouseForm.invalid) {
      this.warehouseForm.markAllAsTouched();
      return;
    }

    const warehouse: WarehouseDto = this.warehouseForm.value;

    this.isEditMode ? this.update(warehouse) : this.create(warehouse);
  }

  private create(warehouse: WarehouseDto): void {
    this.service.add(warehouse).subscribe({
      next: (res: ApiResponse<string>) => {
        if (res.success) {
          this.toast.success('تم إضافة المخزن بنجاح');
          this.dialogRef.close(true);
        } else {
          this.toast.error(res.returnMsg);
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء الإضافة')
    });
  }

  private update(warehouse: WarehouseDto): void {
    if (!warehouse.id) warehouse.id = this.data.item?.id ?? '';

    this.service.update(warehouse).subscribe({
      next: (res: ApiResponse<boolean>) => {
        if (res.success) {
          this.toast.success('تم تحديث المخزن بنجاح');
          this.dialogRef.close(true);
        } else {
          this.toast.error(res.returnMsg);
        }
      },
      error: () => this.toast.error('حدث خطأ أثناء التحديث')
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
