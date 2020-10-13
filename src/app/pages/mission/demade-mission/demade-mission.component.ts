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
  
  diff: number = 1
  listTransport = [
    { type: 'Avion', delay: 7 },
    { type: 'Covoiturage', delay: 1 },
    { type: 'Train', delay: 1 },
    { type: 'Voiture de service', delay: 1 }]
  collegue: Collegue;
  erreurTechnique: boolean;
  dateTemoin = new Date();

  constructor(private authService: AuthService,
    public activeModal: NgbActiveModal,
    public natureService: NatureService,
    private calendar: NgbCalendar,
    private missionService: MissionService,
  ) {  }

  parseDate(date: Date) {
    let st = date.toString().split("-")
    return date ? st[2] + "-" + st[1] + "-" + st[0]:null
  }

  dateDebutValid(): boolean {
    if (this.mission.dateDebut < this.dateTemoin) {
      return false
    }
    return true
  }

  demanderMission() {
    this.missionService.demanderMission(this.collegue.id, 
      new Mission(this.mission.id, 
        new Date(this.parseDate(this.mission.dateDebut)), 
        new Date(this.parseDate(this.mission.dateFin)), 
        this.mission.nomNature, 
        this.mission.villeDepart,
        this.mission.villeArrivee,
        this.mission.transport,
        null,
        0)).subscribe()
  }

  ngOnInit(): void {
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN,
    )

    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.erreurTechnique = true,
    )
    this.mission = new Mission(1, null, null, null, null, null, null, null, 0)

    this.dateMin = this.calendar.getNext(this.calendar.getToday(), 'd', 1)
    this.dateTemoin.setDate(this.dateTemoin.getDate() + 7)

  }
}
