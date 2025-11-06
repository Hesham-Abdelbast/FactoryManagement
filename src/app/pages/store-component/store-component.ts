import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../core/shared/toast.service';
import { StoreServices } from '../../core/Store/store-services';
import { StoreDto } from '../../model/StoreInventory/store-dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-store-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './store-component.html',
  styleUrl: './store-component.scss',
})
export class StoreComponent implements OnInit {
  materialStocks: StoreDto[] = [];
  filteredStocks: StoreDto[] = [];
  isLoading: boolean = false;
  searchTerm: string = '';
  sortBy: 'name' | 'quantity' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  private destroy$ = new Subject<void>();

  constructor(
    private storeService: StoreServices,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.fetchMaterialStocks();
  }

  /** Fetch material stocks from the server with loading state */
  private fetchMaterialStocks(): void {
    this.isLoading = true;

    this.storeService.getAll().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.materialStocks = res.data;
          console.log('Fetched material stocks:', this.materialStocks);
          // this.applyFilters();
        } else {
          this.toast.warning('لا توجد بيانات متاحة');
        }
      },
      error: (error) => {
        this.isLoading = false;
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