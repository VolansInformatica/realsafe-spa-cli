import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { messages } from 'src/app/messages/AppMessages';
import { CompanyDetail }  from 'src/app/model';
import { CompanyService } from 'src/app/services';
import { TextDialogComponent } from 'src/app/shared/dialogs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services';
import { ListUserGroupsRequest, UserGroup, UserCompany} from '../../../payload';
import { CommAreaService, AppConfigService, TimeoutService } from 'src/app/shared/services';
import { Formatter } from 'src/app/shared/formatters';
import { KeyboardComponent } from '../../keyboard/keyboard.component';
import { CompanyRequest, ListCompanyDetailsRequest } from '../../../payload';
import { CompanyDetailComponent } from '../company/company-detail/company-detail.component';

declare const $: any;

/**
 * Interface para armazenamento dos dados do form.
 */

interface Form {
  companyId: string,
  companyName: string,
  businessName: string,
  groupId: string,
  address: string,
  addressNumber: string,
  addressComplement: string,
  addressNeighborhood: string,
  cityName: string,
  stateCode: string,
  countryCode: string,
  zipCode: string,
  phoneCountryCode: string,
  phoneAreaCode: string,
  phoneNumber: string,
  siteAddress: string,
  emailAddress: string,
  additionalInfo: string,
  status: string
}

/**
 * Componente para cadastro de empresas.
 */

@Component({
  selector: 'rs-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [ TimeoutService ]
})
export class CompanyComponent implements OnInit, OnDestroy {

  /**
   * Declaração das constantes da classe
   */

  private readonly _SHOW_MESSAGE_DELAY: number = 3000;
  
  /**
   * Declaração das variáveis membro.
   */

  private today: Date;
  public companyId: number;
  public groupOwnerId: number;

  public frmAddCompany: Form = {
    companyId: "",
    companyName: "",
    businessName: "",
    groupId: "",
    address: "",
    addressNumber: "",
    addressComplement: "",
    addressNeighborhood: "",
    cityName: "",
    stateCode: "",
    countryCode: "",
    zipCode: "",
    phoneCountryCode: "",
    phoneAreaCode: "",
    phoneNumber: "",
    siteAddress: "",
    emailAddress: "",
    additionalInfo: "",
    status: ""
  };

  public userGroups: Array<UserGroup> = new Array<UserGroup>()
  public companies: Array<UserCompany> = new Array<UserCompany>();
  
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

 
  @ViewChild(CompanyDetailComponent)
  private _companyDetailComponent: CompanyDetailComponent;

  //@ViewChild("companyDetailDialog")
  //private _companyDetailComponent: CompanyDetailComponent;

  public useVK: boolean = true;
  public message: string;

  /**
   * Construtor default da classe.
   * 
   * @param router - Instância do objeto para navegação.
   * @param appConfigService - Instância do serviço de configurações.
   * @param commAreaService - Instância do serviço de dados comuns.
   * @param userService - Instância do serviço de usuários.
   * @param companyService - Instância do serviço de empresas.
   * @param timeoutService - Instância do serviço de timeout.
   */

  constructor(
    private router: Router,
    private appConfigService: AppConfigService,
    private commAreaService: CommAreaService,
    private userService: UserService,
    private companyService: CompanyService,
    private timeoutService: TimeoutService) {
  }

  /**
   * Inicializa o componente para utilização.
   */

    ngOnInit(): void {

    //this.timeoutService.onTimeout(() => {
    //  this.goBack();
    //});

    this.message = null;

    this.loadCompanies();

    this.loadGroups();

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
   * Recebe os dados digitados no teclado virtual.
   * 
   * @param event - Evento com os dados do teclado.
   */

  public onEnterClicked(event: any) {
    if (event.fieldId === "companyId") {
      this.frmAddCompany[`${event.fieldId}`] = Formatter.cnpj(Formatter.padLeft(event.value, "0", 14));
    }
    else {
      this.frmAddCompany[`${event.fieldId}`] = event.value;
    }
    
    $(`#${event.fieldId}`).focus();
  }


  /**
   * Recebe os dados digitados no teclado virtual.
   * 
   * @param event - Evento com os dados do teclado.
   */

  public onCancelClicked(event: any) {
    this.frmAddCompany[`${event.fieldId}`] = event.value;
    $(`#${event.fieldId}`).focus();
  }

  /**
   * Habilita ou desabilita o botão de envio.
   */

  public disableSendButton(): boolean {

    return  this.frmAddCompany.groupId.trim() === "" ||
            this.frmAddCompany.companyName.trim() === "" ||
            this.frmAddCompany.businessName.trim() === "" ||
            this.frmAddCompany.companyId.trim() === "";
  }

  /**
   * Efetua a carga do combo de grupos.
   */

  private loadGroups(): void {
    const request: ListUserGroupsRequest = {
      groupOwnerId: this.commAreaService.groupOwner.groupOwnerId,
      userId: this.commAreaService.user.userId
    };

    this.userService.listUserGroups(request).subscribe(
      (response) => {
        this.userGroups = response.data.userGroups;
        if (this.userGroups.length === 1) {
        }

      },
      (error) => {
        if (error.status === 400) {
          this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
          //  this.setFocus("userId");
          });
        }
        else {
          console.log(error);
          this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
           //this.setFocus("userId");
          });
        }

       });

  }

  /**
   * Efetua a carga do combo de empresas.
   */

  private loadCompanies(): void {
      this.companyService.listCompanies().subscribe(
        (response) => {
          this.companies = response.data.companies;
          if (this.companies.length === 1) {
          }
        },
        (error) => {
          if (error.status === 400) {
            this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
              //this.setFocus("companyName");
            });
          }
          else {
            console.log(error);
            this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
            // this.setFocus("companyName");
            });
          }
  
         });
  }

  /**
   * Apresenta a lista de detalhes da empresa.
   * 
   * @param index - Índice da empresa no array.
   */

  public viewDetails(company: CompanyDetail) {

    const listCompanyDetailsRequest: ListCompanyDetailsRequest = {
      companyId: company.companyId
    }

    this.commAreaService.data["listCompanyDetailsRequest"] = listCompanyDetailsRequest;
    this._companyDetailComponent.show();
  }
  /**
   * Efetua a inserção dos dados de uma nova empresa
   */
  public addCompany(): void {
      
    const cnpj: string = Formatter.unFormat(this.frmAddCompany.companyId);
    const status: string = "A";
    this.today = new Date();

    const request: CompanyRequest = {
      groupId: Number(this.frmAddCompany.groupId),
      companyName: this.frmAddCompany.companyName,
      businessName: this.frmAddCompany.businessName,
      companyId: Number(cnpj),
      address: this.frmAddCompany.address,
      addressNumber: this.frmAddCompany.addressNumber,
      addressComplement: this.frmAddCompany.addressComplement,
      addressNeighborhood: this.frmAddCompany.addressNeighborhood,
      cityName: this.frmAddCompany.cityName,
      stateCode: this.frmAddCompany.stateCode,
      countryCode: this.frmAddCompany.countryCode,
      zipCode: Number(this.frmAddCompany.zipCode),
      phoneCountryCode: Number(this.frmAddCompany.phoneCountryCode),
      phoneAreaCode: Number(this.frmAddCompany.phoneAreaCode),
      phoneNumber: Number(this.frmAddCompany.phoneNumber),
      siteAddress: this.frmAddCompany.siteAddress,
      emailAddress: this.frmAddCompany.emailAddress,
      additionalInfo: this.frmAddCompany.additionalInfo,
      status: status,
      creationDate: this.today
    };

      this.message = null;

      this.companyService.addCompany(request).subscribe(
        (response) => {
          this._textDialog.info(messages["company.create.success"], this._SHOW_MESSAGE_DELAY, () => {
          this.loadCompanies();
          })
        },
        (error) => {
          if (error.status === 400) {
            this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
              //this.setFocus("groupId");
            });
          }
          else {
            console.log(error);
            this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
              //this.setFocus("groupId");
            });
          }

        }
      );
    }      

  /**
   * Recebe o evento click do botão deletar.
   */

  public removeCompany(company: CompanyDetail) {
    this.companyService.removeCompany(company).subscribe(
      (response) => {
        console.log(response);
        this._textDialog.info(messages["company.remove.success"], this._SHOW_MESSAGE_DELAY, () => {
          this.loadCompanies();
        })
      },
      (error) => {
        if (error.status === 400) {
          this._textDialog.error(error.error.message, this._SHOW_MESSAGE_DELAY, () => {
            //this.setFocus("groupId");
          });
        }
        else {
          console.log(error);
          this._textDialog.error(messages.format("unknown.error", error.error.message), this._SHOW_MESSAGE_DELAY, () => {
            //this.setFocus("groupId");
          });
        }
      }
    );
  }

  /**
   * Recebe o evento click do botão cancelar.
   */

  public onCancel(): void {
    //this.frmAddCompany.groupId = "";
    this.frmAddCompany.companyName = "";
    this.frmAddCompany.businessName = "";
    this.frmAddCompany.companyId = "";

    this.goBack();

  }

  /**
   * Retorna para a tela de menu
   */

  public goBack() {
    this.router.navigate(['registration-menu']);
  }

  /**
   * Retorna para a tela de login
   */

  public goLoginPage() {
    this.router.navigate(['login']);
  }
 
  /**
   * Efetua o cleanup dos recursos do componente.
   */

  ngOnDestroy(): void {

    this.timeoutService.stop();

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

    /**
   * Apresenta o diálogo de confirmação.
   */

  public show(): void {

    $('#companyDetailDialog').on('shown.bs.modal', function () {
      $('#btnYes').trigger('focus')
    })

    $("#companyDetailDialog").modal({ backdrop: 'static', keyboard: false });

  }

  /**
   * Esconde o diálogo de confirmação.
   */

  public hide(): void {
    $("#companyDetailDialog").modal('hide');
  }

 }


