import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HAutoCompleteComponent } from '../../../shared/Component/h-auto-complete/h-auto-complete';
import { ApiResponse } from '../../../model/api-response';
import { DicKeyValue } from '../../../model/dic-key-value';
import { MerchantDto } from '../../../model/Merchant/merchant-dto';
import { SystemInventoryServices } from '../../../core/SystemInventory/system-inventory-services';
import { MerchantServices } from '../../../core/Merchant/merchant-services';
import { InventoryResultMerchant } from "./inventory-result-merchant/inventory-result-merchant";

@Component({
  selector: 'app-inventory-merchant-component',
  templateUrl: './inventory-merchant-component.html',
  styleUrls: ['./inventory-merchant-component.scss'],
  imports: [HAutoCompleteComponent, CommonModule, ReactiveFormsModule, InventoryResultMerchant],
})
export class InventoryMerchantComponent implements OnInit {

  form!: FormGroup;
  result: any;

  merchants: DicKeyValue[] = [];
  selectedMerchantId?: string;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantServices,
    private systemInventoryServices:SystemInventoryServices
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      merchant: ['', Validators.required]
    });

    this.getAllMerchants();
  }

  onSelected(merchantId: string) {
    this.selectedMerchantId = merchantId;

    if (this.form.contains('merchant')) {
      this.form.get('merchant')?.setValue(merchantId);
    }
  }

  getInventory() {
    if (this.form.invalid || !this.selectedMerchantId) return;

    const payload = {
      fromDate: this.form.value.fromDate,
      toDate: this.form.value.toDate,
      merchantId: this.selectedMerchantId
    };

    console.log('Merchant Inventory Payload:', payload);

    this.systemInventoryServices.GetMerchantInventory(payload.merchantId, payload.fromDate, payload.toDate)
      .subscribe((res: ApiResponse<any>) => {
        console.log(res,'Merchant res data')
        if (res.success && res.data) {
          this.result = res.data;
        }
      });
  }

  private getAllMerchants(): void {
    // Replace with your actual service that fetches merchant list
    this.merchantService.getAll()
      .subscribe(
        (res: ApiResponse<MerchantDto[]>) => {
          if (res.success && res.data?.length) {
            this.merchants = res.data.map(m => ({ key: m.id, value: m.name } as DicKeyValue));
          } else {
            this.merchants = [];
            console.warn('لا توجد تجار للعرض');
          }
        },
        error => {
          this.merchants = [];
          console.error('فشل تحميل قائمة التجار، يرجى المحاولة لاحقاً', error);
        }
      );
  }
}
