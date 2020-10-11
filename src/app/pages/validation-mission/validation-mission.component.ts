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

  acepterMission() {
    alert('la mission sera accepté')
  }

  rejeterMission() {
    alert('la mission sera refusée')
  }

  
  constructor(private missionService: MissionService, private authService: AuthService,) { }

  ngOnInit(): void {

    this.authService.verifierAuthentification().subscribe(col => this.manager = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.missionService.listeMissionsManager(this.manager.id).subscribe(
        listM => this.listMission = listM,
        () => this.erreurTechnique = true,
      )
    )
  }
}
