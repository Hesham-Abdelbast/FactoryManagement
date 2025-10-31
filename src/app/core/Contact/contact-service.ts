import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { ContactURLs } from '../../shared/helper/urls';
import { ContactDto } from '../../model/Contact/contact-dto';
import { BaseServicesService } from '../shared/base-services.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private baseService: BaseServicesService) {}
  
  /**
   * جلب جميع بيانات جهة الاتصال
   */
  GetContact(): Observable<ApiResponse<ContactDto>> {
    return this.baseService
      .GetRequest<ApiResponse<ContactDto>>(ContactURLs.GetContact)
      .pipe(
        catchError(error =>
          this.handleError<ContactDto>('جلب بيانات جهة الاتصال', error, [] as any)
        )
      );
  }

  /**
   * تحديث بيانات جهة الاتصال
   */
  update(contact: ContactDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(ContactURLs.Update, contact)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('تحديث بيانات جهة الاتصال', error, null)
        )
      );
  }

  // 🔒 معالج الأخطاء المركزي القابل لإعادة الاستخدام
  private handleError<T>(
    context: string,
    error: any,
    fallbackData: T | null
  ): Observable<ApiResponse<T>> {
    console.error(`حدث خطأ أثناء ${context}:`, error);
    return of({
      success: false,
      data: fallbackData,
      returnMsg: `حدث خطأ أثناء ${context}. الرجاء المحاولة لاحقاً.`,
      returnCode: '',
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0
    } as ApiResponse<T>);
  }
}
