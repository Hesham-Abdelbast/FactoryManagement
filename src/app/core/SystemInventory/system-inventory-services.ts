import { Injectable } from '@angular/core';
import { BaseServicesService } from '../shared/base-services.service';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { SystemInventoryURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class SystemInventoryServices {
  constructor(private baseService: BaseServicesService) { }
  /**
 * 🔍 Search Transactions with filters
 */
  GetTrnxReport(from: Date,to:Date): Observable<ApiResponse<any>> {
    return this.baseService
      .GetRequest<ApiResponse<any>>(SystemInventoryURLs.GetTrnxReport(from,to))
      .pipe(
        catchError(error =>
          this.handleError<any>('searching transactions', error, [])
        )
      );
  }


  /**
 * 🔍 Search Transactions with filters
 */
  GetEmployeeFullFinancialReport(empId:string,from: Date,to:Date): Observable<ApiResponse<any>> {
    return this.baseService
      .GetRequest<ApiResponse<any>>(SystemInventoryURLs.GetEmployeeFullFinancialReport(empId,from,to))
      .pipe(
        catchError(error =>
          this.handleError<any>('searching Employess', error, [])
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
