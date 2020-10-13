import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { GestionMissionComponent } from './pages/mission/gestion-mission/gestion-mission.component';
import { PlannigMissionComponent } from './pages/plannig-mission/plannig-mission.component';
import { PrimesComponent } from './pages/primes/primes.component';
import { SaisieNatureComponent } from './saisie-nature/saisie-nature.component';
import { SaisieNoteDeFraisComponent } from './frais/saisie-note-de-frais/saisie-note-de-frais.component';
import { ValidationMissionComponent } from './pages/validation-mission/validation-mission.component';
import { GestionFraisComponent } from './frais/gestion-frais/gestion-frais.component';

const routes: Routes = [
  { path: 'connection', component: AuthComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'gestion-mission', component: GestionMissionComponent },
  { path: 'planning-mission', component: PlannigMissionComponent },
  { path: 'primes', component: PrimesComponent },
  { path: 'gestion-frais', component: GestionFraisComponent },
  { path: 'notes-frais/:id', component: SaisieNoteDeFraisComponent },
  { path: 'validation-mission', component: ValidationMissionComponent },

  { path: 'natures', component: SaisieNatureComponent },
  { path: '', pathMatch: 'full', redirectTo: '/accueil' },
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
