import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/models/mission';

@Component({
  selector: 'app-demade-mission',
  templateUrl: './demade-mission.component.html',
  styleUrls: ['./demade-mission.component.scss']
})
export class DemadeMissionComponent implements OnInit {

  mission:Mission = new Mission(1, new Date(1995, 11, 17) ,new Date(1995, 11, 17)  ,'conseil','caracas','montpellier','bus','valide',10)


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
