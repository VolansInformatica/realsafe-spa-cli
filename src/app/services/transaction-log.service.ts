import { Injectable } from '@angular/core';
import { ResourceAccessService } from '../shared/services';
import { Observable } from 'rxjs';
import { RestResponse, ListTransactionLogResponse, ListTransactionLogRequest, ListDepositDetailsRequest, ListDepositDetailsResponse } from '../payload';

/**
 * Serviço para acesso das funcionalidades de logs de transações.
 */

@Injectable({
  providedIn: 'root'
})
export class TransactionLogService {

  /**
   * Construtor default do serviço.
   */

  constructor(
    private resourceAccessService: ResourceAccessService) { 
  }

  /**
   * Retorna a lista de logs de transações de um terminal.
   */

  public listTransactionsByTerminal(request: ListTransactionLogRequest): Observable<RestResponse<ListTransactionLogResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("transactionLog", "listTransactionsByTerminal", request).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );

    });

  };

  /**
   * Retorna a lista de logs de transações de um proprietário de grupo.
   */

  public listTransactionsByGroupOwner(request: ListTransactionLogRequest): Observable<RestResponse<ListTransactionLogResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("transactionLog", "listTransactionsByGroupOwner", request).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );

    });

  };

  /**
   * Retorna a lista de detalhes de depóstios.
   */

  public listDepositDetails(request: ListDepositDetailsRequest): Observable<RestResponse<ListDepositDetailsResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("transactionLog", "listDepositDetails", request).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );

    });

  };
  
}
