import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

/**
 * Serviço para tratamento de timeouts da aplicação.
 */

@Injectable()
export class TimeoutService implements OnDestroy {

  /**
   * Declaração das constantes da classe
   */

  private readonly _DEFAULT_MILLIS: number = 300000;
  private readonly _DEFAULT_INTERVAL: number = 1000;

  /**
   * Declaração das variáveis membro
   */

  private _millis: number = 0;
  private _elapsed: number = 0;
  private _callback: Function = null;
  private _subscription: Subscription = null;
  private _running: boolean = false;

  /**
   * Construtor default da classe
   */

  constructor() {
    this._millis = this._DEFAULT_MILLIS;
  }

  /**
   * Registra a função de callback do timer.
   * 
   * @param callback - Função de callback a ser executada.
   * @param millis - Quantidade de milisegundos.
   */

  public onTimeout(callback: Function, millis?: number) {

    if (millis && millis > 0) {
        this._millis = millis;
    }

    this._callback = callback;

    this.execute();

  }

  /**
   * Executa a contagem do timer.
   */

  private execute(): void {

    this._running = true;

    this._elapsed = this._millis;

    this._subscription = interval(this._DEFAULT_INTERVAL).subscribe(() => {
      
      this._elapsed -= this._DEFAULT_INTERVAL;

      if (this._elapsed <= 0) {

          this.stop();

          if (this._callback) {
              this._callback();
          }

      }

    });

  }

  /**
   * Encerra a execução do timer.
   */

  public stop(): void {

    if (this._subscription) {
        this._subscription.unsubscribe();
    }

    this._running = false;

  }

  /**
   * Incializa a o timer.
   */

  public reset(): void {

    this._elapsed = this._millis;

    this.stop();
    this.execute();

  }

  /**
   * Efetua o cleanup dos recursos do serviço.
   */

  ngOnDestroy(): void {

    this.stop();

  }

}