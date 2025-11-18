import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../../core/shared/toast.service';
import { EquipmentManagementService } from '../../../../../core/Equipments/equipment-management-service';
import { EquipmentIncomeDto } from '../../../../../model/Equipments/equipment-income-dto';
import { CommonModule } from '@angular/common';
import { HModalComponent } from "../../../../../shared/Component/h-modal/h-modal.component";

@Component({
  selector: 'app-add-edit-equipment-income',
  templateUrl: './add-edit-equipment-income-component.html',
  styleUrls: ['./add-edit-equipment-income-component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HModalComponent]
})
export class AddEditEquipmentIncomeComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditEquipmentIncomeComponent>,
    private toast: ToastService,
    private service: EquipmentManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, item?: EquipmentIncomeDto, equipmentId: string }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEdit;
    this.initForm();

    if (this.isEditMode && this.data.item) {
      this.form.patchValue(this.data.item);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      equipmentId: [this.data.equipmentId, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      rentalName: ['', Validators.required],
      note: ['']
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.toast.warning('الرجاء إدخال البيانات المطلوبة.');
      this.form.markAllAsTouched();
      return;
    }

    const model = this.isEditMode
      ? { ...this.data.item, ...this.form.value }
      : this.form.value;

    if (this.isEditMode) {
      this.service.UpdateEquipmentIncome(model).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('تم تحديث الإيراد');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error("⚠ حدث خطأ أثناء العملية")
      });
    }
    else {
      this.service.addEquipmentIncome(model).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('تمت إضافة الإيراد');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error("⚠ حدث خطأ أثناء العملية")
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}