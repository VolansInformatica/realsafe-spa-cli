import { Injectable } from '@angular/core';
import { ResourceAccessService } from '../shared/services';
import { DepositRequest, DepositResponse, RestResponse } from '../payload';
import { Observable } from 'rxjs';

/**
 * Serviço para acesso das funcionalidades de transações de depósito.
 */

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  /**
   * Construtor default do serviço.
   */

  constructor(
    private resourceAccessService: ResourceAccessService) { 
  }

  /**
   * Efetua a gravação dos dados de uma transação de depósito.
   */

  public deposit(request: DepositRequest): Observable<RestResponse<DepositResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("deposit", "deposit", request).subscribe(
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
