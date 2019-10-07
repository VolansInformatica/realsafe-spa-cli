import { Injectable } from '@angular/core';
import { ResourceAccessService } from '../shared/services';
import { HealthCheckResponse } from '../payload';
import { Observable } from 'rxjs';

/**
 * Serviço para acesso das funcionalidades de inicialização da aplicação.
 */

@Injectable({
  providedIn: 'root'
})
export class InitializerService {

  /**
   * Construtor default do componente.
   * 
   * @param resourceAccessService - Instância do serviço de acesso a recursos. 
   */

  constructor(
    private resourceAccessService: ResourceAccessService) {
    }

    /**
     * Efetua a checagem do status da aplicação
     */

    public healthCheck(): Observable<HealthCheckResponse> {

      return new Observable((observer) => {

        this.resourceAccessService.get("health", "check").subscribe(
          (response) => {
            observer.next(response);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
  
      });
  
    }

}