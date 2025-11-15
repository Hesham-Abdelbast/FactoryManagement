// financing.service.ts
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { PaginationEntity } from '../../model/pagination-entity';
import { FinancingDto } from '../../model/financing-dto';
import { FinancingURLs } from '../../shared/helper/urls';
import { FinancingCreateDto } from '../../model/financing-create-dto';

@Injectable({
  providedIn: 'root'
})
export class FinancingService {
  constructor(private baseService: BaseServicesService) {}

  // ---------------- Get all financings (with pagination) ----------------
  getAllWithPagination(param: PaginationEntity): Observable<ApiResponse<FinancingDto[]>> {
    return this.baseService.PostRequest<ApiResponse<FinancingDto[]>>(FinancingURLs.GetAllWithPagination, param)
      .pipe(catchError(err => this.handleError<FinancingDto[]>('جلب جميع التمويلات مع الصفحات', err, [])));
  }

  // ---------------- Get all financings (no pagination) ----------------
  getAll(): Observable<ApiResponse<FinancingDto[]>> {
    return this.baseService.GetRequest<ApiResponse<FinancingDto[]>>(FinancingURLs.GetAll)
      .pipe(catchError(err => this.handleError<FinancingDto[]>('جلب جميع التمويلات', err, [])));
  }

  // ---------------- Get financing by ID ----------------
  getById(id: string): Observable<ApiResponse<FinancingDto>> {
    return this.baseService.GetRequest<ApiResponse<FinancingDto>>(FinancingURLs.GetById(id))
      .pipe(catchError(err => this.handleError<FinancingDto>(`جلب التمويل بالمعرف ${id}`, err, null)));
  }

  // ---------------- Add new financing ----------------
  add(dto: FinancingCreateDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(FinancingURLs.Add, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة تمويل جديد', err, null)));
  }

  // ---------------- Update financing ----------------
  update(dto: FinancingDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(FinancingURLs.Update, dto)
      .pipe(catchError(err => this.handleError<boolean>('تحديث التمويل', err, null)));
  }

  // ---------------- Delete financing ----------------
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(FinancingURLs.Delete(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف التمويل بالمعرف ${id}`, err, false)));
  }

  // ---------------- Check if financing exists ----------------
  exists(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.GetRequest<ApiResponse<boolean>>(FinancingURLs.Exists(id))
      .pipe(catchError(err => this.handleError<boolean>(`التحقق من وجود التمويل بالمعرف ${id}`, err, false)));
  }

  // 🔒 Centralized Arabic error handler
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
