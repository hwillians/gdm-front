import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';

import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { SaisieNoteDeFraisComponent } from './saisie-note-de-frais/saisie-note-de-frais.component';
import { SaisieNatureComponent } from './saisie-nature/saisie-nature.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjoutNatureComponent } from './saisie-nature/ajout-nature/ajout-nature.component';
import { SupprimerNatureComponent } from './saisie-nature/supprimer-nature/supprimer-nature.component';
import { ModifierNatureComponent } from './saisie-nature/modifier-nature/modifier-nature.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    SaisieNoteDeFraisComponent,
    SaisieNatureComponent,
    AjoutNatureComponent,
    SaisieNatureComponent,
    SupprimerNatureComponent,
    ModifierNatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }