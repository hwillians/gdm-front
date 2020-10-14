import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter, NgbModal,} from '@ng-bootstrap/ng-bootstrap';
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
  link= "/gestion-mission"
  today = new Date()
  dateTemoin = new Date();


  diff: number = 1
  listTransport = [
    { type: 'Avion' },
    { type: 'Covoiturage'},
    { type: 'Train'},
    { type: 'Voiture de service' }]
  collegue: Collegue;
  erreurTechnique = false;
  message:string

  constructor(private authService: AuthService,
    public natureService: NatureService,
    private calendar: NgbCalendar,
    private missionService: MissionService,
    private modalService: NgbModal,
    private router :Router
  ) {   }

  setVilleArrivee(event){
    this.mission.villeDepart = event.name
      }
    
      setVilleDepart(event){
        this.mission.villeDepart = event.name
          }

  parseDate(date: Date) {
    let st = date.toString().split("-")
    return date ? st[2] + "-" + st[1] + "-" + st[0] : null
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });}


  demanderMission(content: any) {
    if (this.mission.dateDebut > this.mission.dateFin) {
      this.openVerticallyCentered(content) 
      this.message="la date de fin doit être supérieure ou égale à la date de début"     
    }else if(this.mission.transport==="Avion" && new Date(this.parseDate(this.mission.dateDebut))<this.dateTemoin){
      this.openVerticallyCentered(content) 
      this.message= "Pour les deplacement en avion une anticipation de 7 jours est exigée"
    } else {   
      this.missionService.demanderMission(this.collegue.id,
        new Mission(this.mission.id,
          new Date(this.parseDate(this.mission.dateDebut)),
          new Date(this.parseDate(this.mission.dateFin)),
          this.mission.nomNature,
          this.mission.villeDepart,
          this.mission.villeArrivee,
          this.mission.transport,
          null,
          0)).subscribe(
            mission =>{

this.mission=null;
this.router.navigateByUrl("/gestion-mission")
            } ,
            error => this.erreurTechnique = true
          )
    }
  }

  ngOnInit(): void {
    this.dateTemoin.setDate(this.today.getDate()+7)
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN,
    )
    this.authService.verifierAuthentification().subscribe(col => this.collegue = col,
      () => this.authService.collegueConnecteObs.subscribe()
    )
    this.mission = new Mission(1, null, null, null, null, null, null, null, 0)
    this.dateMin = this.calendar.getNext(this.calendar.getToday(), 'd', 1)
  }
}
