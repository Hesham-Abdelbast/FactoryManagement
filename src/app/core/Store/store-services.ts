import { Injectable } from '@angular/core';
import { BaseServicesService } from '../shared/base-services.service';
import { StoreDto } from '../../model/StoreInventory/store-dto';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { StoreURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class StoreServices {
  
  constructor(private baseService: BaseServicesService) {}
  
    /**
     * Fetch all Merchants
     */
    getAll(): Observable<ApiResponse<StoreDto[]>> {
      return this.baseService
        .GetRequest<ApiResponse<StoreDto[]>>(StoreURLs.GetAll)
        .pipe(
          catchError(error =>
            this.handleError<StoreDto[]>('fetching all Merchants', error, [])
          )
        );
    }
  
    /**
     * Fetch Merchant by ID
     */
    getById(id: string): Observable<ApiResponse<StoreDto>> {
      return this.baseService
        .GetRequest<ApiResponse<StoreDto>>(StoreURLs.GetByID(id))
        .pipe(
          catchError(error =>
            this.handleError<StoreDto>(
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
    add(materialType: StoreDto): Observable<ApiResponse<string>> {
      return this.baseService
        .PostRequest<ApiResponse<string>>(StoreURLs.Add, materialType)
        .pipe(
          catchError(error =>
            this.handleError<string>('adding Merchant', error, null)
          )
        );
    }
  
    /**
     * Update existing Merchant
     */
    update(materialType: StoreDto): Observable<ApiResponse<boolean>> {
      return this.baseService
        .PutRequest<ApiResponse<boolean>>(StoreURLs.Update, materialType)
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
        .DeleteRequest<ApiResponse<boolean>>(StoreURLs.Delete(id))
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
