import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { PaginationEntity } from '../../model/pagination-entity';
import { ExternalTransactionURLs } from '../../shared/helper/urls';
import { ExternalTransactionDto } from '../../model/ExternalTrnx/external-transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class ExternalTrnxService {

  constructor(private baseService: BaseServicesService) {}

  /**
   * Get all external transactions (no pagination)
   */
  getAll(): Observable<ApiResponse<ExternalTransactionDto[]>> {
    return this.baseService
      .GetRequest<ApiResponse<ExternalTransactionDto[]>>(ExternalTransactionURLs.GetAll)
      .pipe(
        catchError(err =>
          this.handleError<ExternalTransactionDto[]>('fetching all external transactions', err, [])
        )
      );
  }

  /**
   * Get all external transactions with pagination
   */
  getAllPaged(param: PaginationEntity): Observable<ApiResponse<ExternalTransactionDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<ExternalTransactionDto[]>>(ExternalTransactionURLs.GetAllPaged, param)
      .pipe(
        catchError(err =>
          this.handleError<ExternalTransactionDto[]>(`fetching external transactions paged`, err, [])
        )
      );
  }

  /**
   * Get single external transaction by id
   */
  getById(id: string): Observable<ApiResponse<ExternalTransactionDto>> {
    return this.baseService
      .GetRequest<ApiResponse<ExternalTransactionDto>>(ExternalTransactionURLs.GetById(id))
      .pipe(
        catchError(err =>
          this.handleError<ExternalTransactionDto>(
            `fetching external transaction by id ${id}`,
            err,
            null
          )
        )
      );
  }

  /**
   * Create new external transaction
   */
  create(dto: ExternalTransactionDto): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(ExternalTransactionURLs.Create, dto)
      .pipe(
        catchError(err =>
          this.handleError<string>('creating external transaction', err, null)
        )
      );
  }

  /**
   * Update external transaction
   */
  update(dto: ExternalTransactionDto): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(ExternalTransactionURLs.Update, dto)
      .pipe(
        catchError(err =>
          this.handleError<boolean>('updating external transaction', err, false)
        )
      );
  }

  /**
   * Delete external transaction
   */
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(ExternalTransactionURLs.Delete(id))
      .pipe(
        catchError(err =>
          this.handleError<boolean>(`deleting external transaction id ${id}`, err, false)
        )
      );
  }


  // Central error handler
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
