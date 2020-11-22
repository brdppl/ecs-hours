import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './core/material.modules';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask'
import { MarginDirective } from './directives/margin.directive';
import { ToastComponent } from './components/toast/toast.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalSettingsComponent } from './components/modal-settings/modal-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MarginDirective,
    ToastComponent,
    ModalConfirmComponent,
    ModalSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ToastComponent,
    ModalConfirmComponent,
    ModalSettingsComponent
  ]
})
export class AppModule { }
