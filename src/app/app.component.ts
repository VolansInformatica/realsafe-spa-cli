import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './shared/services';
import { DatePipe } from '@angular/common';

/**
 * Componente inicial da aplicação
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Construtor default do componente.
   */

  constructor(
    private appConfigService: AppConfigService) {
  };

  /**
   * Inicializa o componente para utilização.
   */

  public ngOnInit(): void {

    if (this.appConfigService.checkSensors) {

        const datePipe: DatePipe = new DatePipe("pt-BR");

        const interval: number = this.appConfigService.checkSensorsMillis;

        (function checkSensors() {
          const now: string = datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss.SSS");
          console.log(`${now} - Checking sensors...`);
          setTimeout(checkSensors, interval);
        })();

    }

  }

}
