import { Component, OnInit } from '@angular/core';
import { Collegue } from 'src/app/auth/auth.domains';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-gestion-mission',
  templateUrl: './gestion-mission.component.html',
  styleUrls: ['./gestion-mission.component.scss']
})
export class GestionMissionComponent implements OnInit {

  collegue:Collegue = new Collegue({id:6})

  
listMission:Mission[]
erreurTechnique = false

  constructor(private missionService:MissionService) { }

  ajouterMission(){
    alert('un frais sera ajouté')
  }

  supprimerMission(){
    alert('le frais sera supprimé')
  }

  editerMission(){
    alert('le frais sera modifié')
  }

  ngOnInit(): void {
  this.missionService.listeMissions(this.collegue.id).subscribe(
  listM => this.listMission = listM,
  () => this.erreurTechnique = true,
  () => { }
  )}

}
