import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-modification-mission',
  templateUrl: './modification-mission.component.html',
  styleUrls: ['./modification-mission.component.scss']
})
export class ModificationMissionComponent implements OnInit {

  mission:Mission = new Mission(1, new Date(1995, 11, 17) ,new Date(1995, 11, 17)  ,'conseil','caracas','montpellier','bus','valide',10)

  constructor(private missionService:MissionService) { }

  ngOnInit(): void {
  }

  modifier(){
    this.missionService.modifierMission(this.mission.id,this.mission)
    .subscribe(mission => this.mission = mission)
  }

}
