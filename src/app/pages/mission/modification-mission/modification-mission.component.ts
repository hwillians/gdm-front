import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  idMission
  mission: Mission
  listNature: Nature[]
  dateMin: NgbDate
  diff: number = 1
  listTransport = [
    { type: 'Avion', delay: 7 },
    { type: 'Covoiturage', delay: 1 },
    { type: 'Train', delay: 1 },
    { type: 'Voiture de service', delay: 1 }]


  message: string
  listMission: Mission[]
  erreurTechnique: boolean;
  dateTemoin = new Date();
  collegue: Collegue

  constructor(private missionService: MissionService,
    private authService: AuthService,
    public natureService: NatureService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute) {

    this.idMission = route.snapshot.paramMap.get("idMission")

  }
  setVilleArrivee(event: { name: string; }) {
    this.mission.villeDepart = event.name
  }

  setVilleDepart(event: { name: string; }) {
    this.mission.villeArrivee = event.name
  }

  parseDate(date: Date): Date {
    let st = date.toString().split("-")
    return new Date(date ? st[2] + "-" + st[1] + "-" + st[0] : null)
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  siChevauche(dateDebut: Date, dateFin: Date): Boolean {
    for (let mission of this.listMission) {
      if (dateDebut >= new Date(mission.dateDebut) || dateFin <= new Date(mission.dateFin)) {
        return true
      }
    }
  }

  modifierMission(mission: Mission, content: any) {
    if (this.mission.dateDebut > this.mission.dateFin) {
      this.openVerticallyCentered(content)
      this.message = "la date de fin doit être supérieure ou égale à la date de début"
    } else if (this.mission.transport === "Avion" && this.parseDate(this.mission.dateDebut) < this.dateTemoin) {
      this.openVerticallyCentered(content)
      this.message = "Pour les deplacement en avion une anticipation de 7 jours est exigée"
    // } else if (this.siChevauche(this.parseDate(this.mission.dateDebut), this.parseDate(this.mission.dateFin))) {
    //   this.openVerticallyCentered(content);
    //   this.message = "Cette mission chevauche une autre mission ou un congé";
    } else if (this.parseDate(this.mission.dateDebut).getDay() === 6 || this.parseDate(this.mission.dateDebut).getDay() === 7) {
      this.openVerticallyCentered(content);
      this.message = "la mission ne peut pas commencer un jour non travaillé";
    } else if (this.parseDate(this.mission.dateFin).getDay() === 6 || this.parseDate(this.mission.dateFin).getDay() === 7) {
      this.openVerticallyCentered(content);
      this.message = "la mission ne peut pas finir un jour non travaillé";
    } else {
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
        .subscribe(newMission => {
          this.mission = newMission
          this.router.navigateByUrl("/gestion-mission")
        },
          error => this.erreurTechnique = true)
    }
  }

  ngOnInit(): void {
    this.authService.collegueConnecteObs.subscribe(
      col => {
        this.collegue = col;
        this.missionService.listeMissions(this.collegue.id).subscribe(
          listM => this.listMission = listM,
          () => this.erreurTechnique = true,
        );
      })

    this.missionService.getMission(this.idMission).subscribe(
      mission => this.mission = mission
    )
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN,
    )

    this.dateMin = this.calendar.getNext(this.calendar.getToday(), 'd', 1)
  }
}
