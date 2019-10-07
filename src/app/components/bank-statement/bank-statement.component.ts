import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionLogService } from '../../services';
import { TransactionLog, ListTransactionLogRequest, ListDepositDetailsRequest, GetOpeningDetailRequest, GetClosingDetailRequest } from '../../payload';
import { CommAreaService, TimeoutService } from '../../shared/services';

declare const $: any;

/**
 * Componente para tratamento do extrato de valores.
 */

@Component({
  selector: 'rs-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrls: ['./bank-statement.component.scss'],
  providers: [ TimeoutService ]
})
export class BankStatementComponent implements OnInit, OnDestroy {

  /**
   * Declaração das constantes da classe
   */

  private readonly _TAB_MAX_ROWS: number = 10;
  private readonly _ALLOWED_KEYS: string[] = 
        ["0", "1", "2", "3",  "4", "5", "6", "7", "8", "9", 
         "n", "N", "p", "P", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Escape"];

  /**
   * Declaração das variáveis membro.
   */

  public page: number = 1;
  public pages: number = 0;
  public total: number = 0;

  public isDepositDetail: boolean = false;
  public isOpeningDetail: boolean = false;
  public isClosingDetail: boolean = false;

  public _cache: Array<TransactionLog>;
  public transactionLogs: Array<TransactionLog>;

  /**
   * Construtor default da classe.
   * 
   * @param router - Instância do objeto para navegação.
   * @param commAreaService - Instância do serviço de dados comuns.
   * @param transactionLogService - Instância do serviço de log de transações.
   * @param timeoutService - Instância do serviço de timeout.
   */

  constructor(
    private router: Router,
    private commAreaService: CommAreaService,
    private transactionLogService: TransactionLogService,
    private timeoutService: TimeoutService) {
  }

  /**
   * Inicializa o componente para utilização.
   */

  ngOnInit() {

    this.timeoutService.onTimeout(() => {
      this.goLoginPage();
    });

    const request: ListTransactionLogRequest = {
      terminalId: this.commAreaService.terminal.terminalId
    }

    this.transactionLogService.listTransactionsByTerminal(request).subscribe(
      (response) => {
        this._cache = response.data.transactionLogs;
        this.pages = Math.ceil(this._cache.length / this._TAB_MAX_ROWS);
        this.sum();
        this.paginate();
        setTimeout(() => {
          $("#btnBack").focus();
        }, 100);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  /**
   * Calcula o total dos valores das transações.
   */

  private sum(): void {

    this.total = 0;

    const items: Array<TransactionLog> = this._cache.filter((item) => {
      return item.functionalityId === 3;
    });

    items.forEach((item) => {
        this.total += item.amount;
      }
    );

  }

  /**
   * Avança para a próxima página.
   */

  public previousPage(): void {

    this.page -= 1;

    if (this.page < 1) {
        this.page = 1;
    }

    this.paginate();

  }

  /**
   * Avança para a próxima página.
   */

  public nextPage(): void {

    this.page += 1;

    if (this.page > this.pages) {
        this.page = this.pages;
    }

    this.paginate();

  }

  /**
   * Posiciona na página informada.
   * 
   * @param page - Página a ser apresentada.
   */

  public gotoPage(page: number) {

    if (page <= 0 || page > this.pages) {
        return;
    }

    this.page = page;

    this.paginate();

  }

  /**
   * Efetua a paginação para a página informada.
   * 
   * @param page - Número da página.
   */

  public paginate(): void {

    const start: number = (this.page * this._TAB_MAX_ROWS) - this._TAB_MAX_ROWS;
    const end: number = (start + this._TAB_MAX_ROWS);

    this.transactionLogs = this._cache.slice(start, end);

  }

  /**
   * Apresenta a lista de detalhes de depósito.
   * 
   * @param index - Índice do item no array.
   */

  public listDepositDetails(index: number) {

    const request: ListDepositDetailsRequest = {
        dateTime: this.transactionLogs[index].dateTime,
        nsuTerminal: this.transactionLogs[index].nsuTerminal,
        unitName: this.transactionLogs[index].unitName,
        terminalId: this.transactionLogs[index].terminalId,
        userName: this.transactionLogs[index].userName,
        amount: this.transactionLogs[index].amount
    }

    this.commAreaService.data["listDepositDetailRequest"] = request;

    this.isDepositDetail = true;

  }

  /**
   * Apresenta os dados do detalhe da abertura do terminal.
   * 
   * @param index - Índice do item no array.
   */

  public getOpeningDetail(index : number) {

    const request: GetOpeningDetailRequest = {
      dateTime: this.transactionLogs[index].dateTime,
      nsuTerminal: this.transactionLogs[index].nsuTerminal,
      unitName: this.transactionLogs[index].unitName,
      terminalId: this.transactionLogs[index].terminalId,
      userName: this.transactionLogs[index].userName,
  }

    this.commAreaService.data["getOpeningDetailRequest"] = request;

    this.isOpeningDetail = true;

  }

  /**
   * Apresenta os dados do detalhe do fechamento do terminal.
   * 
   * @param index - Índice do item no array.
   */

  public getClosingDetail(index : number) {

    const request: GetClosingDetailRequest = {
      dateTime: this.transactionLogs[index].dateTime,
      nsuTerminal: this.transactionLogs[index].nsuTerminal,
      unitName: this.transactionLogs[index].unitName,
      terminalId: this.transactionLogs[index].terminalId,
      userName: this.transactionLogs[index].userName,
  }

    this.commAreaService.data["getClosingDetailRequest"] = request;

    this.isClosingDetail = true;

  }

  /**
   * Recebe o evento keydown do documento.
   */

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: any) {

    this.timeoutService.reset();

    if (this._ALLOWED_KEYS.indexOf(event.key) === -1) {
        return;
    }

    if (event.key === 'Escape') {
        this.goBack(); return;
    }

    if (event.key === "n" || 
        event.key === "N" || 
        event.key === "ArrowRight") {
        this.nextPage(); return;
    }
    
    if (event.key === "p" || 
        event.key === "P" || 
        event.key === "ArrowLeft") {
        this.previousPage(); return;
    }

    if (event.key === "ArrowUp") {
        this.gotoPage(1); return;
    }

    if (event.key === "ArrowDown") {
      this.gotoPage(this.pages); return;
    }

    this.gotoPage(Number(event.key));

  }

  /**
   * Recebe o evento mousedown do documento.
   */

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(event: any) {

    this.timeoutService.reset();

  }

  /**
   * Retorna para a tela de menu
   */

  public goBack() {

      this.router.navigate(['menu']);
      
  }

  /**
   * Retorna para a tela de login
   */

  public goLoginPage() {

    setTimeout(()=> {
      this.router.navigate(['login']);
    }, 250);

  }
 
  /**
   * Efetua o cleanup dos recursos do componente.
   */

  ngOnDestroy(): void {

    this.isDepositDetail = false;
    this.isOpeningDetail = false;
    this.isClosingDetail = false;

    this.timeoutService.stop();

  }
 
}
