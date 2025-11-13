import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../core/shared/toast.service';
import { StoreServices } from '../../core/Store/store-services';
import { StoreDto } from '../../model/StoreInventory/store-dto';
import { Subject, takeUntil } from 'rxjs';
import { WarehouseInventoryServices } from '../../core/WarehouseInventory/warehouse-inventory-services';
import { WarehouseServices } from '../../core/Warehouse/warehouse-services';
import { WarehouseDto } from '../../model/Warehouse/warehouse-dto';
import { ApiResponse } from '../../model/api-response';
import { WarehouseInventoryDto } from '../../model/Warehouse/warehouse-inventory-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-component',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './store-component.html',
  styleUrl: './store-component.scss',
})
export class StoreComponent implements OnInit {

  warehouseLst:WarehouseDto[] = [];
  materialStocks : WarehouseInventoryDto[] = []
  warehouseId = ''
  constructor(
    private storeService: StoreServices,
    private warehouseInventoryServices:WarehouseInventoryServices,
    private warehouseServices:WarehouseServices,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetAllWarhouses();
  }

  GetAllWarhouses(){
    this.warehouseServices.getAll().subscribe( (res:ApiResponse<WarehouseDto[]>) =>{
      if(res.success && res.data){
        this.warehouseLst = res.data;
        this.warehouseId = res.data[0].id
        this.fetchMaterialStocks(res.data[0].id);
      }
      else{
        this.toast.error('فشل في جلب المستودعات')
      }
    })
  }

  onWarehouseChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    if (selectedId) {
      this.fetchMaterialStocks(selectedId);
    }
  }

  /** Fetch material stocks from the server with loading state */
  private fetchMaterialStocks(id:string): void {
    this.warehouseInventoryServices.getByWarehouseId(id).subscribe({
      next: (res:ApiResponse<WarehouseInventoryDto[]>) => {
        if (res.success && res.data) {
          this.materialStocks = res.data;
        } else {
          this.toast.warning('لا توجد بيانات متاحة');
        }
      },
      error: (error) => {
        console.error('Error fetching material stocks:', error);
        this.toast.error('فشل في جلب مخزون المواد من الخادم.');
      }
    });
  }

  /** Get stock status class based on quantity */
  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 10) return 'low-stock';
    if (quantity < 50) return 'medium-stock';
    return 'high-stock';
  }

  /** Get stock status text */
  getStockStatusText(quantity: number): string {
    if (quantity === 0) return 'نفذت الكمية';
    if (quantity < 10) return 'كمية قليلة';
    if (quantity < 50) return 'كمية متوسطة';
    return 'كمية كافية';
  }

  /** Calculate stock percentage for progress bar */
  getStockPercentage(quantity: number): number {
    // You might want to adjust this based on your maximum expected quantity
    const maxQuantity = 100;
    return Math.min((quantity / maxQuantity) * 100, 100);
  }

  /** Get current time for display */
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}