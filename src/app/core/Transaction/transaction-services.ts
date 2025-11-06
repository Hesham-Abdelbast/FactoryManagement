import { Injectable } from '@angular/core';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { catchError, Observable, of } from 'rxjs';
import { TransactionDto } from '../../model/Transaction/transaction-dto';
import { TransactionURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class TransactionServices {
  constructor(private baseService: BaseServicesService) {}
    
      /**
       * Fetch all Transactions
       */
      getAll(): Observable<ApiResponse<TransactionDto[]>> {
        return this.baseService
          .GetRequest<ApiResponse<TransactionDto[]>>(TransactionURLs.GetAll)
          .pipe(
            catchError(error =>
              this.handleError<TransactionDto[]>('fetching all Transactions', error, [])
            )
          );
      }
    /**
       * Fetch Transaction by ID
       */
      GetAllByMerchantId(id: string): Observable<ApiResponse<TransactionDto[]>> {
        return this.baseService
          .GetRequest<ApiResponse<TransactionDto[]>>(TransactionURLs.GetAllByMerchantId(id))
          .pipe(
            catchError(error =>
              this.handleError<TransactionDto[]>(
                `fetching Transaction by ID ${id}`,
                error,
                null
              )
            )
          );
      }
      /**
       * Fetch Transaction by ID
       */
      getById(id: string): Observable<ApiResponse<TransactionDto>> {
        return this.baseService
          .GetRequest<ApiResponse<TransactionDto>>(TransactionURLs.GetByID(id))
          .pipe(
            catchError(error =>
              this.handleError<TransactionDto>(
                `fetching Transaction by ID ${id}`,
                error,
                null
              )
            )
          );
      }
    
      /**
       * Add new Transaction
       */
      add(materialType: TransactionDto): Observable<ApiResponse<string>> {
        return this.baseService
          .PostRequest<ApiResponse<string>>(TransactionURLs.Add, materialType)
          .pipe(
            catchError(error =>
              this.handleError<string>('adding Transaction', error, null)
            )
          );
      }
    
      /**
       * Update existing Transaction
       */
      update(materialType: TransactionDto): Observable<ApiResponse<boolean>> {
        return this.baseService
          .PutRequest<ApiResponse<boolean>>(TransactionURLs.Update, materialType)
          .pipe(
            catchError(error =>
              this.handleError<boolean>('updating Transaction', error, null)
            )
          );
      }
    
      /**
       * Delete Transaction by ID
       */
      delete(id: string): Observable<ApiResponse<boolean>> {
        return this.baseService
          .DeleteRequest<ApiResponse<boolean>>(TransactionURLs.Delete(id))
          .pipe(
            catchError(error =>
              this.handleError<boolean>(`deleting Transaction with ID ${id}`, error, false)
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
