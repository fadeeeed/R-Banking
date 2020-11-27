import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';


import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { SharingService } from './Services/sharing.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    TabViewModule
  ],
  providers: [SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
