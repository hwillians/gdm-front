import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collegue } from './auth/auth.domains';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links = [
    { title: 'Accueil', fragment: '1', lien: '/accueil' },
    { title: 'Saisie note de frais', fragment: '2', lien: '/notes-frais' },
    { title: 'Gestion des missions', fragment: '3', lien: '/gestion-mission' },
    { title: 'Planning des missions', fragment: '4', lien: '/planning-mission' },
    { title: 'Primes', fragment: '5', lien: '/primes' },

  ];


  collegueConnecte: Observable<Collegue>;

  collegue: Collegue

  constructor(private authSrv: AuthService, private router: Router, public route: ActivatedRoute) {

  }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {

    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    this.authSrv.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authSrv.collegueConnecteObs.subscribe(),
      
      () => {
        if (this.collegue.roles.includes("ROLE_ADMINISTRATEUR")) {
          this.links.push({ title: 'Nature de mission', fragment: '6', lien: '/natures' },)
        } else if(this.collegue.roles.includes("ROLE_MANAGER")){
          this.links.push({ title: 'Validation mission', fragment: '6', lien: '' },)
        }
      }
      
    )


  }
}
