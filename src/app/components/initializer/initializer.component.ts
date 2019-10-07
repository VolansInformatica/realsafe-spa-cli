import { Component, OnInit } from '@angular/core';
import { PrinterService, DepositoryService, GroupOwnerService, TerminalService } from '../../services';
import { Router } from '@angular/router';
import { messages } from '../../messages/AppMessages';
import { CommAreaService } from '../../shared/services';
import { GetTerminalStatusRequest } from 'src/app/payload';

/**
 * Componente para inicialização da aplicação.
 */

@Component({
  selector: 'rs-initializer',
  templateUrl: './initializer.component.html',
  styleUrls: ['./initializer.component.scss']
})
export class InitializerComponent implements OnInit {

  /**
   * Declaração das constantes da classe
   */

  private readonly _WAIT_TIMEOUT: number = 500;
  private readonly _RETRY_TIMEOUT: number = 7000;

  /**
   * Declaração das variáveis membro
   */

  public checking: boolean = true;
  public hasError: boolean = false;
  public message: string = "";

  /**
   * Construtor default do componente.
   * 
   * @param router - Instância do gerenciador de rotas da aplicação.
   * @param groupOwnerService - Instância do serviço de proprietário de grupos.
   * @param terminalService - Instância do serviço de terminais.
   * @param commAreaService - Instância do serviço de dados comuns.
   * @param printerService - Instância do serviço de impressoras.
   * @param depositoryService - Instância do serviço de depositários.
   */

  constructor(
    private router: Router,
    private groupOwnerService: GroupOwnerService,
    private terminalService: TerminalService,
    private commAreaService: CommAreaService,
    private printerService: PrinterService,
    private depositoryService: DepositoryService) {
  }

  /**
   * Inicializa o componente para utilização.
   */

  ngOnInit(): void {

    this.message = messages["initializing.app"];

    setTimeout(() => {
      this.checkServices();
    }, this._WAIT_TIMEOUT);

  }

  /**
   * Efetua a verificação dos serviços da aplicação
   */

  private checkServices() {

    this.checking = true;
    this.hasError = false;

    this.message = messages["checking.services"];

    setTimeout(() => {

      this.groupOwnerService.getLocalGroupOwner().subscribe(
        (response) => {
          this.commAreaService.groupOwner = response.data.groupOwner;
          this.message = messages["check.services.success"];
          this.getLocalTerminal();
        },
        (error) => {
          if (error.status === 0) {
            this.checkErrors(-1, messages["services.communication.error"]);
          }
          else {
            this.checkErrors(error.error.code, error.error.message);
          }
        }
      );

    }, this._WAIT_TIMEOUT);

  }

  /**
   * Obtem os dados do terminal.
   */

  private getLocalTerminal() {

    this.checking = true;
    this.hasError = false;

    this.message = messages["getting.terminal.info"];

    setTimeout(() => {

      this.terminalService.getLocalTerminal().subscribe(
        (response) => {
          this.commAreaService.terminal = response.data.terminal;
          this.message = messages["check.services.success"];
          this.getTermialStatus();
        },
        (error) => {
          if (error.status === 0) {
            this.checkErrors(-1, messages["services.communication.error"]);
          }
          else {
            this.checkErrors(error.error.code, error.error.message);
          }
        }
      );

    }, this._WAIT_TIMEOUT);

  }

  /**
   * Obtem os dados do status terminal.
   */

  private getTermialStatus() {

    this.checking = true;
    this.hasError = false;

    this.message = messages["getting.terminal.status.info"];

    setTimeout(() => {

      const request: GetTerminalStatusRequest = {
        terminalId: this.commAreaService.terminal.terminalId
      }

      this.terminalService.getTerminalStatus(request).subscribe(
        (response) => {
          this.commAreaService.terminalStatus = response.data.terminalStatus;
          this.message = messages["check.services.success"];
          this.checkPrinter();
        },
        (error) => {
          if (error.status === 0) {
            this.checkErrors(-1, messages["services.communication.error"]);
          }
          else {
            this.checkErrors(error.error.code, error.error.message);
          }
        }
      );

    }, this._WAIT_TIMEOUT);

  }

  /**
   * Efetua a verificação da impressora
   */

  private checkPrinter() {

    this.checking = true;
    this.hasError = false;

    this.message = messages["checking.printer"];

    setTimeout(() => {

      this.printerService.check().subscribe(
        () => {
          this.message = messages["check.printer.success"];
          this.checkDepository();
        },
        (error) => {
          this.checkErrors(error.error.code, error.error.message);
        }
      );

    }, this._WAIT_TIMEOUT);

  }

  /**
   * Efetua a verificação do depositário impressora.
   */

  private checkDepository() {

    this.checking = true;
    this.hasError = false;

    this.message = messages["checking.depository"];

    setTimeout(() => {

      this.depositoryService.check().subscribe(
        () => {
          this.message = messages["check.depository.success"];
          this.startApplication();
        },
        (error) => {
          this.checkErrors(error.error.code, error.error.message);
        }
      );

    }, this._WAIT_TIMEOUT);

  }

  /**
   * Inicia a execução da aplicação.
   */

  private startApplication() {

    this.message = messages["initialization.ok"];

    setTimeout(() => {
      this.router.navigate(["login"]);
    }, this._WAIT_TIMEOUT);

  }

  /**
   * Efetua a verificação de erros.
   * 
   * @param code - Código do erro recebido.
   * @param message - Mensagem do erro recebido.
   */

  private checkErrors(code: number, message: string) {

    this.checking = false;
    this.hasError = true;

    this.message = message;

    setTimeout(() => {
      this.checkServices();
    }, this._RETRY_TIMEOUT);

  }

}
