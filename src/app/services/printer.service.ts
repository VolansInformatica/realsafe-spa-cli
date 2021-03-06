import { Injectable } from '@angular/core';
import { ResourceAccessService } from '../shared/services';
import { Observable } from 'rxjs';
import { RestResponse, PrinterStatus, PrintRequest } from '../payload';

/**
 * Serviço para acesso das funcionalidades de impressoras.
 */

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  /**
   * Construtor default da classe.
   */

  constructor(
    private resourceAccessService: ResourceAccessService) { 
  }

  /**
   * Efetua a checagem da impressora.
   */

  public check(): Observable<RestResponse<number>> {

    return new Observable((observer) => {

      this.resourceAccessService.get("printer", "check").subscribe(
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

  /**
   * Obtem o status da impressora.
   */

  public getStatus(): Observable<RestResponse<PrinterStatus>> {

    return new Observable((observer) => {

      this.resourceAccessService.get("printer", "getStatus").subscribe(
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

  /**
   * Efetua a impressão de dados.
   */

  public print(request: PrintRequest): Observable<RestResponse<number>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("printer", "print", request).subscribe(
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

  /**
   * Efetua a inicialização da impressora.
   */

  public reset(): Observable<RestResponse<number>> {

    return new Observable((observer) => {

      this.resourceAccessService.get("printer", "reset").subscribe(
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
