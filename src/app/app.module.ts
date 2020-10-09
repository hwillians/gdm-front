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
import { GestionMissionComponent } from './pages/mission/gestion-mission/gestion-mission.component';
import { DemadeMissionComponent } from './pages/mission/demade-mission/demade-mission.component';
import { ModificationMissionComponent } from './pages/mission/modification-mission/modification-mission.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    SaisieNoteDeFraisComponent,
    SaisieNatureComponent,
    GestionMissionComponent,
    DemadeMissionComponent,
    ModificationMissionComponent,
    AjoutNatureComponent,
    ModifierNatureComponent,
    SupprimerNatureComponent

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