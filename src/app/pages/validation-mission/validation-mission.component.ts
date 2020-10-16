import { Component, OnInit } from '@angular/core';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.scss']
})
export class ValidationMissionComponent implements OnInit {

  manager: Collegue
  listMission: Mission[]
  erreurTechnique = false

  constructor(private missionService: MissionService, private authService: AuthService,) { }

  acepterMission(idMission: number, valide: boolean) {
    this.missionService.validationMission(idMission, valide, this.manager.id).subscribe(
      listM => this.listMission = listM,
    )
    alert('la mission ' + idMission + ' a été acceptée')
  }

  rejeterMission(idMission: number, valide: boolean) {
    this.missionService.validationMission(idMission, valide, this.manager.id).subscribe(
      listM => this.listMission = listM,
    )
    alert('la mission ' + idMission + ' a été refusée')
  }

  traitementNuit() {
    this.missionService.traitementNuit().subscribe(

    )
  }

  ngOnInit(): void {
    this.authService.collegueConnecteObs.subscribe(
      col => {
        this.manager = col;
        this.missionService.listeMissionsManager(this.manager.id).subscribe(
          listM => this.listMission = listM,
          () => this.erreurTechnique = true,
        );
      })
  }
}
