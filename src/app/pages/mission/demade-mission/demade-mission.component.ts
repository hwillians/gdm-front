import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/models/mission';
import { Nature } from 'src/app/models/nature';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-demade-mission',
  templateUrl: './demade-mission.component.html',
  styleUrls: ['./demade-mission.component.scss']
})
export class DemadeMissionComponent implements OnInit {

  mission: Mission = new Mission(1, new Date(1995, 11, 17), new Date(1995, 11, 17), 'conseil', 'caracas', 'montpellier', 'bus', 'valide', 10);
  listNature: Nature[]

  constructor(public activeModal: NgbActiveModal, public natureService: NatureService) { }

  ngOnInit(): void {
    this.natureService.listeNatures().subscribe(
      listN => this.listNature = listN
    )

  }

}
