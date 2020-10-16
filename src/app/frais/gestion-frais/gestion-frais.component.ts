import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { FraisService } from 'src/app/services/frais.service';
import { Collegue } from '../../auth/auth.domains';
import { AuthService } from '../../auth/auth.service';
import { Mission } from '../../models/mission';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-gestion-frais',
  templateUrl: './gestion-frais.component.html',
  styleUrls: ['./gestion-frais.component.scss']
})
export class GestionFraisComponent implements OnInit {

  collegue: Collegue;
  erreurTechnique = false;
  missionEchue = false;
  fraisInitial = 0;

  listeMissions: Mission[];

  constructor(private fraisService: FraisService, private missionService: MissionService, private authService: AuthService, private router: Router) {
   }

   isMissionEchue(mission: Mission): boolean{     
      return (new Date(mission.dateFin) < new Date());
   }

  ngOnInit(): void {
    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.missionService.listeMissions(this.collegue.id).subscribe(
        listM => {
          this.listeMissions = listM;
          this.getMontant();
        },
        () => this.erreurTechnique = true,
      )
    )
  }

  getMontant ():void {
    this.listeMissions.forEach(mission => {
      let montantTemp = 0;
      this.fraisService.listeNotesDeFrais(mission.id).subscribe(res => {
        res.forEach(frais => {
          montantTemp += frais.montantFrais;
        });
        mission.montant = montantTemp;
      });
    });
  }


}
