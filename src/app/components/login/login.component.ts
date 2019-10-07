import { Component, OnInit, ViewChild } from '@angular/core';
import { messages } from '../../messages/AppMessages';
import { UserService } from '../../services/user.service';
import { LoginRequest } from '../../payload/login/login-request';
import { Router } from '@angular/router';
import { CommAreaService, AppConfigService } from 'src/app/shared/services';
import { TextDialogComponent } from 'src/app/shared/dialogs';
import { Formatter } from 'src/app/shared/formatters';
import { KeyboardComponent } from '../keyboard/keyboard.component';

declare const $: any;

/**
 * Interface para armazenamento dos dados do form.
 */

interface Form {
  userId: string,
  password: string
}

/**
 * Componente para realização do login de um usuário.
 */

@Component({
  selector: 'rs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Declaração das constantes da classe
   */

  private readonly _SHOW_MESSAGE_DELAY: number = 3000;

  /**
   * Declaração das variáveis membro.
   */

  public form: Form = {
    userId: "",
    password: ""
  };

  /**
   * Instância do teclado virtual.
   */

  @ViewChild(KeyboardComponent)
  private _keyboardComponent: KeyboardComponent;

  /**
   * Instância do diálogo de texto.
   */

  @ViewChild(TextDialogComponent)
  private _textDialog: TextDialogComponent;

  public useVK: boolean = true;
  public message: string;

  /**
   * Construtor default da classe.
   * 
   * @param router - Instância do gerenciador de rotas da aplicação.
   * @param appConfigService - Instância do serviço de configurações.
   * @param commAreaService - Instância do serviço de dados comuns.
   * @param userService - Instância do serviço de usuários.
   */

  constructor(
    private router: Router,
    private appConfigService: AppConfigService,
    private commAreaService: CommAreaService,
    private userService: UserService) {
  };

  /**
   * Inicializa o componente para utilização.
   */

  public ngOnInit(): void {
    
    this.form.userId = "";
    this.form.password = "";
    
    this.message = null;

    this.useVK = this.appConfigService.useVK;

  }

  
  /**
   * Apresenta o teclado virtual.
   * 
   * @param params - Parâmetros a serem passados para o teclado virtual.
   */

  public showKeyboard(params: any) {

    if (this.useVK) {
        const value: string = $(`#${params.fieldId}`).val();
        this._keyboardComponent.show({ 
        "fieldId": params.fieldId, 
        "value": Formatter.unFormat(value) || "", 
        "isPassword": params.isPassword || false, 
        "isNumeric": params.isNumeric || false, 
        "maxLength": params.maxLength || 0,
        "kbType": params.kbType || "alpha" });
    }
  
  }

  /**
   * Recebe o evento do pressionamento da tecla enter no teclado virtual.
   * 
   * @param event - Evento com os dados do teclado.
   */

  public onEnterClicked(event: any) {
    if (event.fieldId === "userId") {
      this.form[`${event.fieldId}`] = Formatter.cpf(Formatter.padLeft(event.value, "0", 11));
    }
    else {
      this.form[`${event.fieldId}`] = event.value;
    }
    $(`#${event.fieldId}`).focus();
  }

  /**
   * Recebe o evento do pressionamento da tecla cancelar no teclado virtual.
   * 
   * @param event - Evento com os dados do teclado.
   */

  public onCancelClicked(event: any) {
    this.form[`${event.fieldId}`] = event.value;
    $(`#${event.fieldId}`).focus();
  }

  /**
   * Habilita ou desabilita o botão de envio.
   */

  public disableSendButton(): boolean {

    return  this.form.userId.trim() === "" || 
            this.form.password.trim() === "";

  }

  /**
   * Efetua o login do usuário.
   */

  public doLogin(): void {

    const cpf: string = Formatter.unFormat(this.form.userId);

    const request: LoginRequest = {
      groupOwnerId: this.commAreaService.groupOwner.groupOwnerId,
      userId: Number(cpf),
      password: this.form.password
    };

    this.message = null;

    this.userService.login(request).subscribe(
      (response) => {
        this.commAreaService.user = response.data.user;
        this.router.navigate(['access-menu']);
      },
      (error) => {
        if (error.status === 400) {
          this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
            this.setFocus("userId");
          });
        }
        else {
          console.log(error);
          this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
            this.setFocus("userId");
          });
        }
      }
    );

  }

  /**
   * Posiciona o foco no campo informado.
   * 
   * @param fieldId - Identificador do campo para posicinamento.
   */

  private setFocus(fieldId: string): void {

    setTimeout(() => {
      $(`#${fieldId}`).focus();
    }, 250);

  }

}
