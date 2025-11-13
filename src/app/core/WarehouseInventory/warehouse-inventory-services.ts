import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { BaseServicesService } from '../shared/base-services.service';
import { PaginationEntity } from '../../model/pagination-entity';
import { WarehouseInventoryDto } from '../../model/Warehouse/warehouse-inventory-dto';
import { WarehouseInventoryURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class WarehouseInventoryServices {
  constructor(private baseService: BaseServicesService) {}

  // ============================================================
  // 📋 جلب كل عناصر المخزون
  // ============================================================
  getAll(): Observable<ApiResponse<WarehouseInventoryDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<WarehouseInventoryDto[]>>(WarehouseInventoryURLs.GetAll)
      .pipe(
        catchError(error =>
          this.handleError<WarehouseInventoryDto[]>('جلب جميع عناصر المخزون', error, [])
        )
      );
  }

  // ============================================================
  // 📋 جلب كل عناصر المخزون مع ترقيم الصفحات
  // ============================================================
  getAllWithPagination(data: PaginationEntity): Observable<ApiResponse<WarehouseInventoryDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<WarehouseInventoryDto[]>>(WarehouseInventoryURLs.GetAllWithPagination, data)
      .pipe(
        catchError(error =>
          this.handleError<WarehouseInventoryDto[]>('جلب عناصر المخزون مع ترقيم الصفحات', error, [])
        )
      );
  }

  // ============================================================
  // 🔎 جلب عنصر حسب رقم المعرف
  // ============================================================
  getById(id: string): Observable<ApiResponse<WarehouseInventoryDto>> {
    return this.baseService
      .GetRequest<ApiResponse<WarehouseInventoryDto>>(WarehouseInventoryURLs.GetByID(id))
      .pipe(
        catchError(error =>
          this.handleError<WarehouseInventoryDto>(
            `جلب عنصر المخزون بالمعرف ${id}`,
            error,
            null
          )
        )
      );
  }

  // ============================================================
  // 🔎 جلب العناصر حسب رقم المخزن
  // ============================================================
  getByWarehouseId(warehouseId: string): Observable<ApiResponse<WarehouseInventoryDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<WarehouseInventoryDto[]>>(WarehouseInventoryURLs.GetByWarehouseInventoryId(warehouseId))
      .pipe(
        catchError(error =>
          this.handleError<WarehouseInventoryDto[]>(
            `جلب عناصر المخزون للمخزن رقم ${warehouseId}`,
            error,
            []
          )
        )
      );
  }

  // ============================================================
  // ➕ إضافة عنصر جديد للمخزون
  // ============================================================
  add(item: WarehouseInventoryDto): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(WarehouseInventoryURLs.Add, item)
      .pipe(
        catchError(error =>
          this.handleError<string>('إضافة عنصر جديد للمخزون', error, null)
        )
      );
  }

  // ============================================================
  // ✏️ تعديل عنصر موجود
  // ============================================================
  update(item: WarehouseInventoryDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(WarehouseInventoryURLs.Update, item)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('تعديل بيانات عنصر المخزون', error, null)
        )
      );
  }

  // ============================================================
  // 🗑️ حذف عنصر من المخزون
  // ============================================================
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(WarehouseInventoryURLs.Delete(id))
      .pipe(
        catchError(error =>
          this.handleError<boolean>(`حذف عنصر المخزون بالمعرف ${id}`, error, false)
        )
      );
  }

  // ============================================================
  // ⚠️ معالج الأخطاء المركزي
  // ============================================================
  private handleError<T>(
    context: string,
    error: any,
    fallbackData: T | null
  ): Observable<ApiResponse<T>> {
    console.error(`❌ خطأ أثناء ${context}:`, error);
    return of({
      success: false,
      data: fallbackData,
      returnMsg: `حدث خطأ أثناء ${context}`,
      returnCode: '',
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0
    } as ApiResponse<T>);
  }
}
