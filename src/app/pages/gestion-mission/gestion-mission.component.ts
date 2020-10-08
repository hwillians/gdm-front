import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-gestion-mission',
  templateUrl: './gestion-mission.component.html',
  styleUrls: ['./gestion-mission.component.scss']
})
export class GestionMissionComponent implements OnInit {

  collegue: Collegue
  ob = this.authService.collegueConnecteObs

  listMission: Mission[]
  erreurTechnique = false

  constructor(private missionService: MissionService, private authService: AuthService) { }

  ajouterMission() {
    alert('un frais sera ajouté')
  }

  supprimerMission() {
    alert('le frais sera supprimé')
  }

  editerMission() {
    alert('le frais sera modifié')
  }

  ngOnInit(): void {

    this.authService.collegueConnecteObs.subscribe(col=>this.collegue=col)
  

    this.missionService.listeMissions(6).subscribe(
      listM => this.listMission = listM,
      () => this.erreurTechnique = true,
    )
  }

}
