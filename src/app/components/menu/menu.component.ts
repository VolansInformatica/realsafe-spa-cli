import { Component, OnInit, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TimeoutService, CommAreaService } from '../../shared/services';
import { FunctionalityService } from 'src/app/services';
import { TextDialogComponent } from 'src/app/shared/dialogs';
import { messages } from 'src/app/messages/AppMessages';
import { FunctionalityRole } from 'src/app/payload';

declare const $: any;

/**
 * Componente para tratamento das opções de menu.
 */

@Component({
  selector: 'rs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [ TimeoutService ]
})
export class MenuComponent implements OnInit, OnDestroy {

  /**
   * Declaração das constantes da classe
   */

  private readonly _SHOW_MESSAGE_DELAY: number = 3000;
  private readonly _SET_FOCUS_TIMEOUT: number = 100;
  
  /**
   * Declaração das variáveis membro.
   */

  public functionalitiesRole: Array<FunctionalityRole> = new Array<FunctionalityRole>();

  @ViewChild(TextDialogComponent)
  private _textDialog: TextDialogComponent;

  /**
   * Construtor default da classe.
   * 
   * @param router - Instância do objeto para navegação.
   * @param commAreaService - Instância do serviço de dados comuns.
   * @param functionalityService - Instância do serviço de funcionalidades.
   * @param timeoutService - Instância do serviço de timeout.
   */

  constructor(
    private router: Router,
    private commareaService: CommAreaService,
    private functionalityService: FunctionalityService,
    private timeoutService: TimeoutService) { 
  }

  /**
   * Inicializa o componente para utilização.
   */

  ngOnInit() {

    this.timeoutService.onTimeout(() => {
      this.goBack();
    });

    this.setFocus("opcao01");

    const roleId: number = this.commareaService.userUnit.roleId;

    this.functionalityService.listFunctionalitiesByRoleId(roleId, null).subscribe(
        (response) => {
          this.loadAccessKeys(response);
        },
        (error) => {
          console.log(error);
          if (error.status === 400) {
              this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
              this.setFocus("opcao01");
            });
          }
          else {
              this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
              this.setFocus("opcao01");
            });
          }
        }
    );

  }

  /**
   * Efetua a carga das teclas permitidas.
   * 
   * @param data - Array com as funcionalidades retornadas.
   */

  private loadAccessKeys(response: any): void {

    this.functionalitiesRole = response.data.functionalitiesRole;

  }

  /**
   * Retorna o flag para habilitar / debabilitar o botão do menu.
   * 
   * @param index - Índice do botão no menu.
   */

  public disabledButton(index: number): boolean {

    const functionalityRole: FunctionalityRole = this.functionalitiesRole[index];

    return this.isButtonDisabled(functionalityRole);
  
  }

  /**
   * Recebe o evento keydown do documento.
   */

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: any) {

    if (event.key === 'Escape') {
        if (this.commareaService.isUnique) {
            this.goBack();          
        }
        else {
            this.navigateTo('access-menu');
        }
    }

    this.timeoutService.reset();

    if (event.key === 'Enter') {
        return;
    }

    const functionalityRole: FunctionalityRole = this.findFunctionalityByAccessKey(event.key);

    if (!functionalityRole) {
        return;
    }

    if (this.isButtonDisabled(functionalityRole)) {
        return;
    }

    const route: string = functionalityRole.functionalityRoute;

    if (route) {
        this.navigateTo(route);
    }

  }

  /**
   * Verifica se o botão deve ser desabilitado.
   * 
   * @param functionalityRole - Funcionalidade selecionada.
   */

  private isButtonDisabled(functionalityRole: FunctionalityRole): boolean {

    const status: string = this.commareaService.terminalStatus.status;

    if (status === "O" && functionalityRole.functionalityId === 1) { // Abertura
      return true;
    }

    if (status === "C" && functionalityRole.functionalityId === 2) { // Fechamento
      return true;
    }

    if (status === "C" && functionalityRole.functionalityId === 3) { // Depósito
        return true;
    }

    return false;

  }

  /**
   * Pesquisa pela rota a partir da ordem informada.
   * 
   * @param accessKey - Tecla de acesso a ser pesquisada.
   */

  private findFunctionalityByAccessKey(accessKey: string): FunctionalityRole {

    const result: FunctionalityRole[] = this.functionalitiesRole.filter((item) => {
        return item.functionalityAccessKey === accessKey;
    })

    if (result && result.length > 0) {
        return result[0];
    }

    return null;

  }

  /**
   * Recebe o evento mousedown da página.
   * 
   * @param event - Instância do evento de teclado.
   */

  @HostListener("document:click", ["$event"])
  public onMouseDown(event: MouseEvent) {

    this.timeoutService.reset();

  }

  /**
   * Volta para a tela de login.
   */

  public goBack(): void {
    this.navigateTo('login');
  }

  /**
   * Efetua a navegação para a rota especificada.
   * 
   * @param route - Rota de destino para a navegação.
   */

  public navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Posiciona o foco no campo informado.
   * 
   * @param fieldId - Identificador do campo para posicinamento.
   */

  private setFocus(fieldId: string): void {

    setTimeout(() => {
      $(`#${fieldId}`).focus();
    }, this._SET_FOCUS_TIMEOUT);

  }

  /**
   * Efetua o cleanup dos recursos do componente.
   */

  ngOnDestroy(): void {

    this.timeoutService.stop();

  }

}