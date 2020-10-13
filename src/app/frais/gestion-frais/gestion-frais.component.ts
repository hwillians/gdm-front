import { Component, OnInit } from '@angular/core';
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
  fraisParDefaut = 0;

  listeMissions: Mission[];

  constructor(private missionService: MissionService, private authService: AuthService) {
   }

  ngOnInit(): void {
    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.missionService.listeMissions(this.collegue.id).subscribe(
        listM => this.listeMissions = listM,
        () => this.erreurTechnique = true,
      )
    )
  }

}
