import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomAdapter } from 'src/app/models/custom-adapter';
import { CustomDateParserFormatter } from 'src/app/models/custom-date-parser-formatter';
import { Mission } from 'src/app/models/mission';
import { Nature } from 'src/app/models/nature';
import { MissionService } from 'src/app/services/mission.service';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-modification-mission',
  templateUrl: './modification-mission.component.html',
  styleUrls: ['./modification-mission.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ]
})
export class ModificationMissionComponent implements OnInit {

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

  constructor(private missionService: MissionService,
    private authService: AuthService,
    public activeModal: NgbActiveModal,
    public natureService: NatureService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter) { 

      this.missionService.abonnerMissionSelectionne().subscribe(mission=>this.mission=mission)
    }

    parseDate(date: Date) {
      let st = date.toString().split("-")
      return date ? st[2] + "-" + st[1] + "-" + st[0]:null
    }

  modifierMission(mission: Mission) {
    this.missionService.modifierMission(mission.id, 
      new Mission(this.mission.id, 
        new Date(this.parseDate(this.mission.dateDebut)), 
        new Date(this.parseDate(this.mission.dateFin)), 
        this.mission.nomNature, 
        this.mission.villeDepart,
        this.mission.villeArrivee,
        this.mission.transport,
        null,
        0))
      .subscribe(newMission => this.mission = newMission)
      
  }

  ngOnInit(): void {
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN,
    )
    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe(),
      () => this.erreurTechnique = true,
    )
    this.dateMin = this.calendar.getNext(this.calendar.getToday(), 'd', 1)

  }
}
