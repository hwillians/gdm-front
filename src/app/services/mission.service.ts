import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  // public missionSelectionnee: Mission;
  // subjectMissionSelectionne = new Subject<Mission>()

  // publierMission(mission: Mission): void {
  //   console.log(mission);
  //   localStorage.setItem('mission', JSON.stringify(mission));
  //   this.missionSelectionnee = mission;
  //   this.subjectMissionSelectionne.next(mission); 
  // }

  // abonnerMissionSelectionne(): Observable<Mission> {    
  //   return this.subjectMissionSelectionne.asObservable();
  // }



  constructor(private http: HttpClient) { 
    // let missionLocal = localStorage.getItem('mission');
    // if (missionLocal) {
    //   this.missionSelectionnee = JSON.parse(missionLocal);
    //   console.log(this.missionSelectionnee);
   // }
  }

  listeMissions(idCollegue: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${environment.baseUrl}missions/${idCollegue}`)
  }

  listeMissionsManager(idManager: number): Observable<Mission[]>  {
    return this.http.get<Mission[]>(`${environment.baseUrl}missions/manager/${idManager}`)
  }

  modifierMission(idMission:number,mission:Mission):Observable<Mission>{
    return this.http.patch<Mission>(`${environment.baseUrl}missions/${idMission}`,mission)
  }

  validationMission(idMission:number,valide:boolean,idManager: number): Observable<Mission[]>{
    return this.http.patch<Mission[]>(`${environment.baseUrl}missions/manager/${idManager}`,{"id": idMission, "valide": valide})
  }

  getMission(id: number): Observable<Mission>{
    return this.http.get<Mission>(`${environment.baseUrl}missions?id=${id}`);
  }

}
