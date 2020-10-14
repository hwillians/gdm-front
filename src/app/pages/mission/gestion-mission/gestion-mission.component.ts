import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';
import { DemadeMissionComponent } from '../demade-mission/demade-mission.component';


@Component({
  selector: 'app-gestion-mission',
  templateUrl: './gestion-mission.component.html',
  styleUrls: ['./gestion-mission.component.scss']
})
export class GestionMissionComponent implements OnInit {

  collegue: Collegue
  listMission: Mission[]
  erreurTechnique = false

  constructor(private missionService: MissionService, private authService: AuthService, private modalService: NgbModal) { }

  demanderMission() {

  }

  supprimerMission() {
    const modalRef = this.modalService.open(DemadeMissionComponent);
    modalRef.componentInstance.name = 'app-demade-mission';
    alert('la mission sera supprimée')
  }

  editerMission() {
    alert('la mission sera modifiée')
  }

  ngOnInit(): void {

    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.missionService.listeMissions(this.collegue.id).subscribe(
        listM => this.listMission = listM,
        () => this.erreurTechnique = true,
      )
    )
  }

}
