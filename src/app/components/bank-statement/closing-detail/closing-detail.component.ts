import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClosingDetail } from 'src/app/model';
import { TerminalService } from 'src/app/services';
import { CommAreaService } from 'src/app/shared/services';
import { GetClosingDetailRequest } from 'src/app/payload';

declare const $: any;

/**
 * Diálogo para apresentação dos detalhes do fechamento do terminal.
 */

@Component({
  selector: 'rs-closing-detail',
  templateUrl: './closing-detail.component.html',
  styleUrls: ['./closing-detail.component.scss']
})
export class ClosingDetailComponent implements OnInit {

  /**
   * Declaração das variáveis membro
   */

  public dateTime: Date;
  public nsuTerminal: string;
  public unitName: string;
  public terminalId: string;
  public userName: string;
  public closingDetail: ClosingDetail = {
    nsuTerminal: "",
	  closingDateTime: null,
	  bankNotesInSafe: 0,
	  amountInSafe: 0.00,
	  lastOpeningDateTime: null,
	  lastOpeningBanknotes: 0,
	  lastOpeningAmount: 0.00
  };

  @Input()
  public visible: boolean = false;

  @Output()
  public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Construtor default do diálogo.
   * 
   * @param terminalService - Instância do serviço de terminais.
   * @param commAreaService - Instância do serviço de dados comuns.
   */

  constructor(
    private terminalService: TerminalService,
    private commAreaService: CommAreaService) {
  }

  /**
   * Inicializa o componente para utilização.
   */

  ngOnInit(): void {

    const request: GetClosingDetailRequest = this.commAreaService.data["getClosingDetailRequest"];

    this.dateTime = request.dateTime;
    this.nsuTerminal = request.nsuTerminal;
    this.unitName = request.unitName;
    this.terminalId = request.terminalId;
    this.userName = request.userName;

    delete this.commAreaService.data["getClosingDetailRequest"];

    this.terminalService.getClosingDetail(request).subscribe(
      (response) => {
        this.closingDetail = response.data.closingDetail;
        this.show();
      },
    (error) => {
        console.log(error);
    });

  }

  /**
   * Apresenta o diálogo de detalhes do fechamento.
   */

  public show(): void {

    $("#closingDetailDialog").on('shown.bs.modal', function () {
      setTimeout(() => {
        $("#btnExit").trigger('focus')
      }, 100);
    })

    $("#closingDetailDialog").modal({ backdrop: 'static', keyboard: true });

  }

  /**
   * Esconde o diálogo de detalhes.
   */

  public hide(): void {

    $("#closingDetailDialog").modal('hide');

    this.visible = false;
    this.visibleChange.emit(this.visible);

  }  
  
}
