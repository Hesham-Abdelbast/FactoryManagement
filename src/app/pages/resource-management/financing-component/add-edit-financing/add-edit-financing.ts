import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../shared/Component/h-modal/h-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/shared/toast.service';
import { FinancingService } from '../../../../core/Financing/financing-service';
import { ApiResponse } from '../../../../model/api-response';
import { FinancingDto } from '../../../../model/financing-dto';
import { FinancingCreateDto } from '../../../../model/financing-create-dto';

@Component({
  selector: 'app-add-edit-financing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-financing.html',
  styleUrls: ['./add-edit-financing.scss'],
})
export class AddEditFinancing {
  financingForm!: FormGroup;
  isEditMode = false;
  financing?: FinancingDto;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private financingService: FinancingService,
    private dialogRef: MatDialogRef<AddEditFinancing>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data?.isEdit) {

      this.isEditMode = true;
      this.financing = this.data.Item;
        
      this.financingForm = this.fb.group({
        providerName: [this.financing?.providerName, [Validators.required, Validators.maxLength(100)]],
        amount: [this.financing?.amount, [Validators.required, Validators.min(1)]],
        createDate: [this.financing?.createDate?.split('T')[0], Validators.required],
        notes: [this.financing?.notes || ''],
      });

    } else {
      this.financingForm = this.fb.group({
        providerName: ['', [Validators.required, Validators.maxLength(100)]],
        amount: [0, [Validators.required, Validators.min(1)]],
        createDate: [new Date().toISOString().split('T')[0], Validators.required],
        notes: [''],
      });
    }
  }

  onSubmit(): void {
    if (this.financingForm.invalid) {
      this.financingForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      const updateDto: FinancingDto = {
        ...this.financingForm.value,
        id: this.data.Item.id
      };
      this.update(updateDto);
    } else {
      const createDto: FinancingCreateDto = {
        providerName: this.financingForm.value.providerName,
        amount: this.financingForm.value.amount,
        notes: this.financingForm.value.notes
      };
      this.create(createDto);
    }
  }

  create(dto: FinancingCreateDto): void {
    this.financingService.add(dto).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تم إضافة التمويل بنجاح.');
        this.dialogRef.close(true);
      } else {
        console.log(res.returnMsg)
        this.toast.error('فشل في إضافة التمويل.');
      }
    });
  }

  update(dto: FinancingDto): void {
    this.financingService.update(dto).subscribe((res: ApiResponse<boolean>) => {
      if (res.success) {
        this.toast.success('تم تعديل التمويل بنجاح.');
        this.dialogRef.close(true);
      } else {
        this.toast.error('فشل في تعديل التمويل.');
      }
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
