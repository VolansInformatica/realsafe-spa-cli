import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Serviço para acesso a recursos
 */

@Injectable({
  providedIn: 'root'
})
export class ResourceAccessService {

  /**
   * Construtor default da classe.
   * 
   * @param appConfigService - Instância do serviço de configuração da aplicação.
   */

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService) { 
  }

  /**
   * Efetua a chamada do recurso utilizando o método GET.
   * 
   * @param section - Seção do arquivo de configurações.
   * @param resource - Identificador do recurso do arquivo de configurações.
   * @param options - Opções para chamada do serviço
   */

  public get(section: string, resource: string, options?: any): Observable<any> {

    return new Observable<any>((observer) => {

      const url: string = this.getURL(section, resource);

      this.http.get(url, options).subscribe(
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
   * Efetua a chamada do recurso utilizando o método POST.
   * 
   * @param section - Seção do arquivo de configurações.
   * @param resource - Identificador do recurso do arquivo de configurações.
   * @param options - Opções para chamada do serviço
   */

  public post(section: string, resource: string, body: any, options?: any): Observable<any> {

    return new Observable<any>((observer) => {

      const url: string = this.getURL(section, resource);

      this.http.post(url, body, options).subscribe(
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
   * Retorna a URL de um recurso.
   * 
   * @param keys - Chaves para pesquisa do recurso.
   */

  public getURL(section: string, resource: string): string {

    const endpoint: string = this.appConfigService.getValue(section, "endpoint");
    const api: string = this.appConfigService.getValue(section, "resources", resource);
    const url: string = `${endpoint}${api}`

    return url;

  }

}
