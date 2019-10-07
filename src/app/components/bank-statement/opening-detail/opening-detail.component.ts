import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { OpeningDetail } from 'src/app/model';
import { TerminalService } from 'src/app/services';
import { CommAreaService } from 'src/app/shared/services';
import { GetOpeningDetailRequest } from 'src/app/payload';

declare const $: any;

/**
 * Diálogo para apresentação dos detalhes da abertura do terminal.
 */

 @Component({
  selector: 'rs-opening-detail',
  templateUrl: './opening-detail.component.html',
  styleUrls: ['./opening-detail.component.scss']
})
export class OpeningDetailComponent implements OnInit {

  /**
   * Declaração das variáveis membro
   */

  public dateTime: Date;
  public nsuTerminal: string;
  public unitName: string;
  public terminalId: string;
  public userName: string;
  public openingDetail: OpeningDetail = {
    nsuTerminal: "",
	  openingDateTime: null,
	  bankNotesInSafe: 0,
	  amountInSafe: 0.00,
	  lastClosingDateTime: null,
	  lastClosingBanknotes: 0,
	  lastClosingAmount: 0.00
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

    const request: GetOpeningDetailRequest = this.commAreaService.data["getOpeningDetailRequest"];

    this.dateTime = request.dateTime;
    this.nsuTerminal = request.nsuTerminal;
    this.unitName = request.unitName;
    this.terminalId = request.terminalId;
    this.userName = request.userName;

    delete this.commAreaService.data["getOpeningDetailRequest"];

    this.terminalService.getOpeningDetail(request).subscribe(
      (response) => {
        this.openingDetail = response.data.openingDetail;
        this.show();
      },
    (error) => {
        console.log(error);
    });

  }

  /**
   * Apresenta o diálogo de detalhes da abertura.
   */

  public show(): void {

    $("#openingDetailDialog").on('shown.bs.modal', function () {
      setTimeout(() => {
        $("#btnExit").trigger('focus')
      }, 100);
    })

    $("#openingDetailDialog").modal({ backdrop: 'static', keyboard: true });

  }

  /**
   * Esconde o diálogo de detalhes.
   */

  public hide(): void {

    $("#openingDetailDialog").modal('hide');

    this.visible = false;
    this.visibleChange.emit(this.visible);

  }

}
