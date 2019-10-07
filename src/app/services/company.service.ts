import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestResponse } from '../payload/rest-response';
import { ResourceAccessService } from '../shared/services/resource-access.service';
import { ListCompanyDetailsRequest } from '../payload/company-details/list-company-details-request';
import { ListCompanyDetailsResponse } from '../payload/company-details/list-company-details-response';
import { CompanyDetail, Company } from '../model';
import { CompanyRequest } from '../payload';

/**
 * Serviço para acesso das funcionalidades de empresas.
 */

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  /**
   * Construtor default do serviço.
   */

  constructor(
    private resourceAccessService: ResourceAccessService) { 
  }

  /**
   * Retorna a lista de empresas cadastradas.
   */

  public listCompanies(): Observable<RestResponse<any>> {

    return new Observable((observer) => {

      this.resourceAccessService.get("company", "listCompanies").subscribe(
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
   * Incluir uma empresa.
   */

  public addCompany(request: CompanyRequest): Observable<RestResponse<any>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("company", "update", request).subscribe(
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
   * Retorna a lista de detalhes de uma empresa.
   */

  public listCompanyDetails(request: ListCompanyDetailsRequest): Observable<RestResponse<ListCompanyDetailsResponse>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("company", "findCompanyById", request).subscribe(
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
   * Criar uma empresa.
   */

  public createCompany(request: CompanyDetail): Observable<RestResponse<any>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("company", "create", request).subscribe(
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
   * Remove uma empresa.
   */

  public removeCompany(company: CompanyDetail): Observable<RestResponse<any>> {

    return new Observable((observer) => {

      this.resourceAccessService.post("company", "remove", company).subscribe(
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
