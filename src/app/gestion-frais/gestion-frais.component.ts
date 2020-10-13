import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Mission } from '../models/mission';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-gestion-frais',
  templateUrl: './gestion-frais.component.html',
  styleUrls: ['./gestion-frais.component.scss']
})
export class GestionFraisComponent implements OnInit {

  collegue: Collegue = new Collegue(1);
  erreurTechnique = false;

  listeMissions: Mission[];

  constructor(private missionService: MissionService) {
   }

  ngOnInit(): void {
    this.missionService.listeMissions(this.collegue.id).subscribe(
      listM => this.listeMissions = listM,
      error => this.erreurTechnique = true,
      () => {}
    )
  }

}
