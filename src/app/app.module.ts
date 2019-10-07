import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { SetFocusDirective } from './shared/directives/set-focus.directive';
import { AutoFocusDirective } from './shared/directives/auto-focus.directive';
import { DepositoryComponent } from './components/depository/depository.component';
import { CurrencyDirective } from './shared/directives/currency.directive';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { TextDialogComponent } from './shared/dialogs/text-dialog/text-dialog.component';
import { InitializerComponent } from './components/initializer/initializer.component';
import { HeaderComponent } from './components/header/header.component';
import { BankStatementComponent } from './components/bank-statement/bank-statement.component';
import localePt from '@angular/common/locales/pt';
import { ConfirmDepositDialogComponent } from './components/depository/confirm-deposit-dialog/confirm-deposit-dialog.component';
import { CpfDirective } from './shared/directives/cpf.directive';
import { CnpjDirective } from './shared/directives/cnpj.directive';
import { AccessMenuComponent } from './components/access-menu/access-menu.component';
import { MenuButtonComponent } from './shared/components/menu-button/menu-button.component';
import { RegistrationMenuComponent } from './components/registration-menu/registration-menu.component';
import { DepositDetailComponent } from './components/bank-statement/deposit-detail/deposit-detail.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { OwnerComponent, GroupComponent, CompanyComponent, UnitComponent, UserComponent, RoleComponent, GeographicComponent, FunctionalityComponent } from './components';
import { OpeningComponent } from './components/opening/opening.component';
import { CompanyDetailComponent } from './components/registration-menu/company/company-detail/company-detail.component';
import { OpeningDetailComponent } from './components/bank-statement/opening-detail/opening-detail.component';
import { ClosingComponent } from './components/closing/closing.component';
import { ClosingDetailComponent } from './components/bank-statement/closing-detail/closing-detail.component';

/*
import { ParameterComponent } from "./components/registration-menu/parameter/parameter.component";
*/

registerLocaleData(localePt, "pt");

/**
 * Módulo principal da aplicação.
 */

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    SetFocusDirective,
    AutoFocusDirective,
    DepositoryComponent,
    CurrencyDirective,
    ConfirmDialogComponent,
    TextDialogComponent,
    InitializerComponent,
    HeaderComponent,
    BankStatementComponent,
    ConfirmDepositDialogComponent,
    CpfDirective,
    CnpjDirective,
    AccessMenuComponent,
    MenuButtonComponent,
    RegistrationMenuComponent,
    DepositDetailComponent,
    KeyboardComponent,
    OwnerComponent,
    GroupComponent,
    CompanyComponent,
    UnitComponent,
    UserComponent,
    RoleComponent,
    FunctionalityComponent,
    GeographicComponent,
    //ParameterComponent,
    RegistrationMenuComponent,
    OpeningComponent,
    CompanyDetailComponent,
    OpeningComponent,
    OpeningDetailComponent,
    ClosingComponent,
    ClosingDetailComponent

  ],

  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,    
    AppRoutingModule
  ],

  providers: [
    //{ provide: APP_BASE_HREF, useValue: '/realsafe' },
    { provide: LOCALE_ID, useValue: "pt-BR"}
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }
