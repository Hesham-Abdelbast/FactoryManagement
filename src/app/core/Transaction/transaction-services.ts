import { Injectable } from '@angular/core';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { catchError, Observable, of } from 'rxjs';
import { TransactionDto } from '../../model/Transaction/transaction-dto';
import { TransactionURLs } from '../../shared/helper/urls';
import { PaginationEntity } from '../../model/pagination-entity';
import { CreateTransactionDto } from '../../model/Transaction/create-transaction-dto';
import { InvoiceDto } from '../../model/Transaction/invoice-dto';
import { AllTransByMerchantDto } from '../../model/Transaction/all-trans-by-merchant-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionServices {
  constructor(private baseService: BaseServicesService) {}
    
      /**
       * Fetch all Transactions
       */
      getAll(pagination:PaginationEntity): Observable<ApiResponse<TransactionDto[]>> {
        return this.baseService
          .PostRequest<ApiResponse<TransactionDto[]>>(TransactionURLs.GetAll,pagination)
          .pipe(
            catchError(error =>
              this.handleError<TransactionDto[]>('fetching all Transactions', error, [])
            )
          );
      }
    /**
       * Fetch Transaction by ID
       */
      GetAllByMerchantId(id: string): Observable<ApiResponse<AllTransByMerchantDto>> {
        return this.baseService
          .GetRequest<ApiResponse<AllTransByMerchantDto>>(TransactionURLs.GetAllByMerchantId(id))
          .pipe(
            catchError(error =>
              this.handleError<AllTransByMerchantDto>(
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
       * Fetch Transaction by ID
       */
      getInvoiceById(id: string): Observable<ApiResponse<InvoiceDto>> {
        return this.baseService
          .GetRequest<ApiResponse<InvoiceDto>>(TransactionURLs.GetInvoiceById(id))
          .pipe(
            catchError(error =>
              this.handleError<InvoiceDto>(
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
      add(materialType: CreateTransactionDto): Observable<ApiResponse<string>> {
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
      update(materialType: CreateTransactionDto): Observable<ApiResponse<boolean>> {
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
