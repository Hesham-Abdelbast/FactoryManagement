import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { BaseServicesService } from '../shared/base-services.service';
import { PaginationEntity } from '../../model/pagination-entity';
import { WarehouseExpenseURLs } from '../../shared/helper/urls';
import { WarehouseExpenseDto } from '../../model/Warehouse/warehouse-expense-dto';

@Injectable({
  providedIn: 'root'
})
export class WarehouseExpenseServices {

  constructor(private baseService: BaseServicesService) {}

  // ============================================================
  // 📋 جلب كل المصروفات
  // ============================================================
  getAll(): Observable<ApiResponse<WarehouseExpenseDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<WarehouseExpenseDto[]>>(WarehouseExpenseURLs.GetAll)
      .pipe(
        catchError(error =>
          this.handleError<WarehouseExpenseDto[]>('جلب جميع مصروفات المخازن', error, [])
        )
      );
  }

  // ============================================================
  // 📋 جلب المصروفات مع نظام الترقيم (Pagination)
  // ============================================================
  getAllWithPagination(
    data: PaginationEntity
  ): Observable<ApiResponse<WarehouseExpenseDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<WarehouseExpenseDto[]>>(WarehouseExpenseURLs.GetAllWithPagination, data)
      .pipe(
        catchError(error =>
          this.handleError<WarehouseExpenseDto[]>('جلب مصروفات المخازن مع الترقيم', error, [])
        )
      );
  }

  // ============================================================
  // 🔎 جلب مصروف حسب المعرف
  // ============================================================
  getById(id: string): Observable<ApiResponse<WarehouseExpenseDto>> {
    return this.baseService
      .GetRequest<ApiResponse<WarehouseExpenseDto>>(WarehouseExpenseURLs.GetById(id))
      .pipe(
        catchError(error =>
          this.handleError<WarehouseExpenseDto>(
            `جلب المصروف بالمعرف ${id}`,
            error,
            null
          )
        )
      );
  }

  // ============================================================
  // ➕ إضافة مصروف جديد
  // ============================================================
  add(item: WarehouseExpenseDto): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(WarehouseExpenseURLs.Add, item)
      .pipe(
        catchError(error =>
          this.handleError<string>('إضافة مصروف جديد', error, null)
        )
      );
  }

  // ============================================================
  // ✏️ تعديل مصروف
  // ============================================================
  update(item: WarehouseExpenseDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(WarehouseExpenseURLs.Update, item)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('تعديل المصروف', error, null)
        )
      );
  }

  // ============================================================
  // 🗑️ حذف مصروف
  // ============================================================
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(WarehouseExpenseURLs.Delete(id))
      .pipe(
        catchError(error =>
          this.handleError<boolean>(`حذف مصروف بالمعرف ${id}`, error, false)
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
      returnMsg: `⚠️ حدث خطأ أثناء ${context}`,
      returnCode: '',
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0
    } as ApiResponse<T>);
  }
}
