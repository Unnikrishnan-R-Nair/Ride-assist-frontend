import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { WorkSummaryComponent } from './work-summary/work-summary.component';
import { WorkCreateComponent } from './work-create/work-create.component';
import { WorkListComponent } from './work-list/work-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailComponent,
    LoginComponent,
    NavComponent,
    WorkSummaryComponent,
    WorkCreateComponent,
    WorkListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
