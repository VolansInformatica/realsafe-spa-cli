import { Injectable } from '@angular/core';
import { ResourceAccessService } from '../shared/services';
import { RestResponse, GetGroupOwnerResponse } from '../payload';
import { Observable } from 'rxjs';

/**
 * Serviço para acesso das funcionalidades de proprietário de grupos.
 */

@Injectable({
  providedIn: 'root'
})
export class GroupOwnerService {

  /**
   * Construtor default do serviço.
   */

  constructor(
    private resourceAccessService: ResourceAccessService) { 
  }

  /**
   * Retorna os dados do proprietário de grupos.
   */

  public getLocalGroupOwner(): Observable<RestResponse<GetGroupOwnerResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.get("localGroupOwner", "getLocalGroupOwner").subscribe(
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
