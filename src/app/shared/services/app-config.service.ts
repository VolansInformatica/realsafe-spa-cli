import { Injectable } from '@angular/core';
import * as CONFIGURATIONS from '../configuration/configuration';

/**
 * Serviço para tratamento das configurações da aplicação.
 */

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  
  /**
   * Declaração das variáveis membro.
   */

  private _configurations: any = CONFIGURATIONS;
  public useVK: boolean = true; 
  public checkSensors: boolean = true;
  public checkSensorsMillis: number = 30000;

  /**
   * Construtor default da classe.
   */

  constructor() {
    this._configurations = this._configurations.items[window['__env'].environment];
    this.useVK = window['__env'].useVK;
    this.checkSensors = window['__env'].checkSensors;
    this.checkSensorsMillis = window['__env'].checkSensorsMillis;
  }

  /**
   * Retorna o valor das chaves informadas.
   * 
   * @param keys - Chaves para pesquisa do valor.
   */

  public getValue(...keys: string[]): any {

    let result: any = this._configurations;

    keys.forEach((key) => {
      result = result[key];
    });

    return result;

  } 

}
