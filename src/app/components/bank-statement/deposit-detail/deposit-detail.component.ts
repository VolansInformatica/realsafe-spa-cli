import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransactionLogService } from '../../../services';
import { CommAreaService } from '../../../shared/services';
import { ListDepositDetailsRequest } from '../../../payload'
import { DepositDetail } from 'src/app/model';

declare const $: any;

/**
 * Diálogo para apresentação de detalhes de depósitos.
 */

@Component({
  selector: 'rs-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss']
})
export class DepositDetailComponent implements OnInit {

  /**
   * Declaração das variáveis membro
   */

  public dateTime: Date;
  public nsuTerminal: string;
  public unitName: string;
  public terminalId: string;
  public userName: string;
  public depositDetails: DepositDetail[];
  public amount: number = 0;

  @Input()
  public visible: boolean = false;

  @Output()
  public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  /**
   * Construtor default do diálogo.
   * 
   * @param transactionLogService - Instância do serviço de logs de transações.
   * @param commAreaService - Instância do serviço de dados comuns.
   */

  constructor(
    private transactionLogService: TransactionLogService,
    private commAreaService: CommAreaService) {
  }

  /**
   * Inicializa o componente para utilização.
   */

  ngOnInit(): void {

    const request: ListDepositDetailsRequest = this.commAreaService.data["listDepositDetailRequest"];

    this.dateTime = request.dateTime;
    this.nsuTerminal = request.nsuTerminal;
    this.unitName = request.unitName;
    this.terminalId = request.terminalId;
    this.userName = request.userName;
    this.amount = request.amount;

    delete this.commAreaService.data["listDepositDetailRequest"];

    this.transactionLogService.listDepositDetails(request).subscribe(
      (response) => {
        this.depositDetails = response.data.depositDetails;
        this.show();
      },
    (error) => {
        console.log(error);
    });

  }

  /**
   * Apresenta o diálogo de confirmação do depósito.
   */

  public show(): void {

    $("#depositDetailDialog").on('shown.bs.modal', function () {
      setTimeout(() => {
        $("#btnExit").trigger('focus')
      }, 100);
    })

    $("#depositDetailDialog").modal({ backdrop: 'static', keyboard: true });

  }

  /**
   * Esconde o diálogo de confirmação.
   */

  public hide(): void {

    $("#depositDetailDialog").modal('hide');

    this.visible = false;
    this.visibleChange.emit(this.visible);

  }

}
