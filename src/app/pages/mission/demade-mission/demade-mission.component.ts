import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomAdapter } from 'src/app/models/custom-adapter';
import { CustomDateParserFormatter } from 'src/app/models/custom-date-parser-formatter';
import { Mission } from 'src/app/models/mission';
import { Nature } from 'src/app/models/nature';
import { MissionService } from 'src/app/services/mission.service';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-demade-mission',
  templateUrl: './demade-mission.component.html',
  styleUrls: ['./demade-mission.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})

export class DemadeMissionComponent implements OnInit {

  mission: Mission
  listNature: Nature[]
  dateMin: NgbDate

  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal,
    public natureService: NatureService,
    private calendar: NgbCalendar,
    private missionService: MissionService,
    public formatter: NgbDateParserFormatter) {
  }

   diff: number = 1
  listTransport = [
    { type: 'Avion', delay: 7 },
    { type: 'Covoiturage', delay: 1 },
    { type: 'Train', delay: 1 },
    { type: 'Voiture de service', delay: 1 }]

  collegue: Collegue;

  erreurTechnique: boolean;

  demanderMission() {
    this.missionService.demanderMission(this.collegue.id, this.mission).subscribe()
  }

  ngOnInit(): void {
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN,
    )

    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.erreurTechnique = true,
    )
    this.mission = new Mission(1, null, null, null, null, null, null, null, null)

    this.dateMin = this.calendar.getNext(this.calendar.getToday(), 'd', 1)

  }
}
