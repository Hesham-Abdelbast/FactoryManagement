import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { BaseServicesService } from '../shared/base-services.service';
import { WarehouseDto } from '../../model/Warehouse/warehouse-dto';
import { WarehouseURLs } from '../../shared/helper/urls';
import { PaginationEntity } from '../../model/pagination-entity';
import { WarehouseInventoryDto } from '../../model/Warehouse/warehouse-inventory-dto';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServices {
   constructor(private baseService: BaseServicesService) {}
    
      /**
       * Fetch all Merchants
       */
      getAll(): Observable<ApiResponse<WarehouseDto[]>> {
        return this.baseService
          .GetRequest<ApiResponse<WarehouseDto[]>>(WarehouseURLs.GetAll)
          .pipe(
            catchError(error =>
              this.handleError<WarehouseDto[]>('fetching all Merchants', error, [])
            )
          );
      }
    
      /**
       * Fetch all Merchants
       */
      GetAllWithPagination(data:PaginationEntity): Observable<ApiResponse<WarehouseDto[]>> {
        return this.baseService
          .PostRequest<ApiResponse<WarehouseDto[]>>(WarehouseURLs.GetAllWithPagination,data)
          .pipe(
            catchError(error =>
              this.handleError<WarehouseDto[]>('fetching all Merchants', error, [])
            )
          );
      }
    
      /**
       * Fetch Merchant by ID
       */
      getById(id: string): Observable<ApiResponse<WarehouseDto>> {
        return this.baseService
          .GetRequest<ApiResponse<WarehouseDto>>(WarehouseURLs.GetByID(id))
          .pipe(
            catchError(error =>
              this.handleError<WarehouseDto>(
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
      add(warehouse: WarehouseDto): Observable<ApiResponse<string>> {
        return this.baseService
          .PostRequest<ApiResponse<string>>(WarehouseURLs.Add, warehouse)
          .pipe(
            catchError(error =>
              this.handleError<string>('adding Merchant', error, null)
            )
          );
      }
    
      /**
       * Update existing Merchant
       */
      update(warehouse: WarehouseDto): Observable<ApiResponse<boolean>> {
        return this.baseService
          .PutRequest<ApiResponse<boolean>>(WarehouseURLs.Update, warehouse)
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
          .DeleteRequest<ApiResponse<boolean>>(WarehouseURLs.Delete(id))
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
