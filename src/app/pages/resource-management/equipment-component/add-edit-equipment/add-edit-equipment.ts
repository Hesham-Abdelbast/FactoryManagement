import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/shared/toast.service';
import { ApiResponse } from '../../../../model/api-response';
import { EquipmentCategory } from '../../../../model/Enums/equipment-category';
import { EquipmentDto } from '../../../../model/Equipments/equipment-dto';
import { EquipmentManagementService } from '../../../../core/Equipments/equipment-management-service';

@Component({
  selector: 'app-add-edit-equipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-equipment.html',
  styleUrls: ['./add-edit-equipment.scss'],
})
export class AddEditEquipment {
  categoryLabels: { [key: string]: string } = {
    Internal: '0',
    External: '1'
  };
  equipmentForm!: FormGroup;
  equipment?: EquipmentDto;
  isEditMode = false;

  categories = Object.values(EquipmentCategory);

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private equipmentService: EquipmentManagementService,
    private dialogRef: MatDialogRef<AddEditEquipment>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data?.isEdit) {
      this.isEditMode = true;
      this.equipment = this.data.Item;

      this.equipmentForm = this.fb.group({
        id: [this.equipment?.id],
        name: [this.equipment?.name, [Validators.required, Validators.maxLength(50)]],
        category: [this.categoryLabels[this.equipment?.category??''], Validators.required],
        ownerPartner: [this.equipment?.ownerPartner || ''],
        rentalValue: [this.equipment?.rentalValue ?? 0, [Validators.min(0)]],
        notes: [this.equipment?.notes || ''],
      });

    } else {
      this.equipmentForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        category: ['', Validators.required],
        ownerPartner: [''],
        rentalValue: [0, Validators.min(0)],
        notes: [''],
      });
    }
  }

  onSubmit(): void {
    if (this.equipmentForm.invalid) {
      this.equipmentForm.markAllAsTouched();
      return;
    }

    const equipment: EquipmentDto = this.equipmentForm.value;

    if (this.isEditMode) {
      this.update(equipment);
    } else {
      this.create(equipment);
    }
  }

  create(equipment: EquipmentDto): void {
    this.equipmentService.addEquipment(equipment).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تم إضافة المعدة بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في إضافة المعدة.');
      }
    });
  }

  update(equipment: EquipmentDto): void {
    equipment.id = this.data.Item.id;

    this.equipmentService.updateEquipment(equipment).subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success('تم تعديل المعدة بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في تعديل المعدة.');
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
