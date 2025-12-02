import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { PaginationEntity } from '../../model/pagination-entity';
import { MerchantFinanceURLs } from '../../shared/helper/urls';
import { MerchantFinanceDto } from '../../model/Merchant/merchant-finance-dto';

@Injectable({
  providedIn: 'root'
})
export class MerchantFinance {

  constructor(private baseService: BaseServicesService) {}

  /**
   * Get all Merchant Finance records (no pagination)
   */
  getAll(): Observable<ApiResponse<MerchantFinanceDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<MerchantFinanceDto[]>>(MerchantFinanceURLs.GetAll)
      .pipe(
        catchError(error =>
          this.handleError('جلب جميع المعاملات المالية', error, [])
        )
      );
  }

  /**
   * Get all Merchant Finance records with pagination
   */
  getAllWithPagination(param: PaginationEntity): Observable<ApiResponse<MerchantFinanceDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<MerchantFinanceDto[]>>(MerchantFinanceURLs.GetAllWithPagination, param)
      .pipe(
        catchError(error =>
          this.handleError('جلب المعاملات مع الصفحات', error, [])
        )
      );
  }

  /**
   * Get all Merchant Finance records by Merchant ID with pagination
   */
  getAllByMerchantIdWithPagination(id: string, param: PaginationEntity): Observable<ApiResponse<MerchantFinanceDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<MerchantFinanceDto[]>>(MerchantFinanceURLs.GetAllByMerchantIdWithPagination(id), param)
      .pipe(
        catchError(error =>
          this.handleError(`جلب معاملات التاجر`, error, [])
        )
      );
  }

  /**
   * Get finance record by ID
   */
  getById(id: string): Observable<ApiResponse<MerchantFinanceDto>> {
    return this.baseService
      .GetRequest<ApiResponse<MerchantFinanceDto>>(MerchantFinanceURLs.GetById(id))
      .pipe(
        catchError(error =>
          this.handleError<MerchantFinanceDto>(`جلب العملية بالمعرف: ${id}`, error, null)
        )
      );
  }

  /**
   * Create finance entry
   */
  add(dto: MerchantFinanceDto): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(MerchantFinanceURLs.Add, dto)
      .pipe(
        catchError(error =>
          this.handleError<string>('إضافة معاملة مالية جديدة', error, null)
        )
      );
  }

  /**
   * Update finance record
   */
  update(dto: MerchantFinanceDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(MerchantFinanceURLs.Update, dto)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('تحديث المعاملة المالية', error, null)
        )
      );
  }

  /**
   * Delete finance record
   */
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(MerchantFinanceURLs.Delete(id))
      .pipe(
        catchError(error =>
          this.handleError(`حذف المعاملة المالية بالمعرف: ${id}`, error, false)
        )
      );
  }

  // 🔒 Centralized reusable error handler
    private handleError<T>(
      context: string,
      error: any,
      fallbackData: T | null
    ): Observable<ApiResponse<T>> {
      console.error(`Error ${context}:`, error);
      return of({
        success: false,
        data: fallbackData,
        returnMsg: `Failed while ${context}`,
        returnCode: '',
        pageIndex: 0,
        pageSize: 0,
        totalCount: 0
      } as ApiResponse<T>);
    }
}
