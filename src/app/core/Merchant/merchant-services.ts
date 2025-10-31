import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { BaseServicesService } from '../shared/base-services.service';
import { MerchantDto } from '../../model/Merchant/merchant-dto';
import { MerchantURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class MerchantServices {
  constructor(private baseService: BaseServicesService) {}
  
    /**
     * Fetch all Merchants
     */
    getAll(): Observable<ApiResponse<MerchantDto[]>> {
      return this.baseService
        .GetRequest<ApiResponse<MerchantDto[]>>(MerchantURLs.GetAll)
        .pipe(
          catchError(error =>
            this.handleError<MerchantDto[]>('fetching all Merchants', error, [])
          )
        );
    }
  
    /**
     * Fetch Merchant by ID
     */
    getById(id: string): Observable<ApiResponse<MerchantDto>> {
      return this.baseService
        .GetRequest<ApiResponse<MerchantDto>>(MerchantURLs.GetByID(id))
        .pipe(
          catchError(error =>
            this.handleError<MerchantDto>(
              `fetching Merchant by ID ${id}`,
              error,
              null
            )
          )
        );
    }
  
    /**
     * Add new Merchant
     */
    add(materialType: MerchantDto): Observable<ApiResponse<string>> {
      return this.baseService
        .PostRequest<ApiResponse<string>>(MerchantURLs.Add, materialType)
        .pipe(
          catchError(error =>
            this.handleError<string>('adding Merchant', error, null)
          )
        );
    }
  
    /**
     * Update existing Merchant
     */
    update(materialType: MerchantDto): Observable<ApiResponse<boolean>> {
      return this.baseService
        .PutRequest<ApiResponse<boolean>>(MerchantURLs.Update, materialType)
        .pipe(
          catchError(error =>
            this.handleError<boolean>('updating Merchant', error, null)
          )
        );
    }
  
    /**
     * Delete Merchant by ID
     */
    delete(id: string): Observable<ApiResponse<boolean>> {
      return this.baseService
        .DeleteRequest<ApiResponse<boolean>>(MerchantURLs.Delete(id))
        .pipe(
          catchError(error =>
            this.handleError<boolean>(`deleting Merchant with ID ${id}`, error, false)
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
