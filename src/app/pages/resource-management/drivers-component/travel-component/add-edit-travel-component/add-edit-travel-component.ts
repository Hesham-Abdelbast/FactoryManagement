import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HModalComponent } from '../../../../../shared/Component/h-modal/h-modal.component';
import { DriverManagmentServices } from '../../../../../core/Drivers/driver-managment-services';
import { ToastService } from '../../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateTravelDto } from '../../../../../model/Drivers/create-travel-dto';
import { CommonService } from '../../../../../core/common-service';
import { ProcessType } from '../../../../../model/Enums/process-type';
import { MaterialCategory } from '../../../../../model/Enums/material-category';

@Component({
  selector: 'app-add-edit-travel-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-travel-component.html',
  styleUrls: ['./add-edit-travel-component.scss'],
})
export class AddEditTravelComponent {

  form!: FormGroup;
  isEdit = false;
  processTypeItems = [
    { value: ProcessType.Internal, label: 'داخلي' },
    { value: ProcessType.External, label: 'خارجي' }
  ];

materialCategoryItems = [
  { value: MaterialCategory.Iron, label: 'حديد' },
  { value: MaterialCategory.metals, label: 'معادن' },
  { value: MaterialCategory.others, label: 'أخرى' }
];

  constructor(
    private fb: FormBuilder,
    private travelService: DriverManagmentServices,
    private toast: ToastService,
    private commonServices:CommonService,
    private dialogRef: MatDialogRef<AddEditTravelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data?.item;

    this.form = this.fb.group({
      id: [this.data?.item?.id ?? null],
      driverId: [this.data?.driverId ?? null],
      startDate: [this.commonServices.formatForInputDate(this.data?.item?.startDate) ?? new Date(), Validators.required],
      endDate: [this.commonServices.formatForInputDate(this.data?.item?.endDate) ?? null],
      startLocation: [this.data?.item?.startLocation ?? '', Validators.required],
      destination: [this.data?.item?.destination ?? ''],
      plateNumber: [this.data?.item?.plateNumber ?? ''],
      amount: [this.data?.item?.amount ?? null, Validators.required],
      notes: [this.data?.item?.notes ?? ''],
      createDate: [new Date()],
      category:['',Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const model: CreateTravelDto = this.form.value;

    if (this.isEdit)
      this.update(model);
    else
      this.create(model);
  }

  create(model: CreateTravelDto) {
    this.travelService.addTravel(model).subscribe(res => {
      console.log(res,'aaaaaaaaaaa')
      if (res.success) {
        this.toast.success(" تم إضافة الرحلة بنجاح");
        this.dialogRef.close(true);
      }
    });
  }

  update(model: CreateTravelDto) {
    this.travelService.updateTravel(model).subscribe(res => {
      if (res.success) {
        this.toast.success("تم تعديل بيانات الرحلة");
        this.dialogRef.close(true);
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
