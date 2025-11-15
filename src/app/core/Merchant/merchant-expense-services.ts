import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { MerchantExpenseDto } from '../../model/Merchant/merchant-expense-dto';
import { MerchantExpenseURLs } from '../../shared/helper/urls';
import { MerchantExpenseCreateDto } from '../../model/Merchant/merchant-expense-create-dto';
import { ExpenseSummaryRequest } from '../../model/expense-summary-request';

@Injectable({
  providedIn: 'root'
})
export class MerchantExpenseServices {
  constructor(private baseService: BaseServicesService) {}

  /**
   * Fetch all merchant expenses
   */
  getAll(): Observable<ApiResponse<MerchantExpenseDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<MerchantExpenseDto[]>>(MerchantExpenseURLs.GetAll)
      .pipe(
        catchError(error =>
          this.handleError<MerchantExpenseDto[]>('جلب جميع المصاريف', error, [])
        )
      );
  }

  /**
   * Fetch merchant expense by ID
   */
  getById(id: string): Observable<ApiResponse<MerchantExpenseDto>> {
    return this.baseService
      .GetRequest<ApiResponse<MerchantExpenseDto>>(MerchantExpenseURLs.GetById(id))
      .pipe(
        catchError(error =>
          this.handleError<MerchantExpenseDto>(`جلب المصروف بالمعرف ${id}`, error, null)
        )
      );
  }

  /**
   * Add new merchant expense
   */
  add(expense: MerchantExpenseCreateDto): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(MerchantExpenseURLs.Add, expense)
      .pipe(
        catchError(error =>
          this.handleError<string>('إضافة مصروف جديد', error, null)
        )
      );
  }

  /**
   * Update existing merchant expense
   */
  update(expense: MerchantExpenseDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(MerchantExpenseURLs.Update, expense)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('تحديث المصروف', error, null)
        )
      );
  }

  /**
   * Delete merchant expense by ID
   */
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(MerchantExpenseURLs.Delete(id))
      .pipe(
        catchError(error =>
          this.handleError<boolean>(`حذف المصروف بالمعرف ${id}`, error, false)
        )
      );
  }

  GetMerchantExpenseSummary(
  merchantId: string,
  request: ExpenseSummaryRequest
): Observable<ApiResponse<number>> {
  return this.baseService
    .PostRequest<ApiResponse<number>>(MerchantExpenseURLs.GetSummary(merchantId), request)
    .pipe(
      catchError(error =>
        this.handleError<number>(
          `جلب ملخص المصروف للعميل ${merchantId}`,
          error,
          0
        )
      )
    );
}

  // 🔒 Centralized reusable error handler
  private handleError<T>(context: string, error: any, fallbackData: T | null): Observable<ApiResponse<T>> {
    console.error(`خطأ أثناء ${context}:`, error);
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
