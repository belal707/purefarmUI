import { HttpModule } from '@angular/http';
import { ContractService } from './shared/service/contract.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { KeycloakHttp, KEYCLOAK_HTTP_PROVIDER } from './shared/service/keycloak.http';
import { KeycloakService } from './shared/service/keycloak.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './user/adduser.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { ProviderComponent } from './provider/provider.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DefaultComponent } from './default/default.component'
import { DefaultService } from './default/default.service';
import {HomeService} from './home/home.service';
import { CustomerService } from './customer/customer.service';
import { UserService } from './user/user.service';
@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    UserComponent,
    CustomerComponent,
    ProviderComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LeftnavComponent,
    HomeComponent,
    AddUserComponent,
    DefaultComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    KEYCLOAK_HTTP_PROVIDER,
    KeycloakService,
    ContractService,
    DefaultService,
    HomeService,
    CustomerService,
    UserService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
