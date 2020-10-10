import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Frais } from '../models/frais';


interface FraisBack {
  id: number;
  date: Date;
  natureFrais: string;
  montantFrais: number;
}

@Injectable({
  providedIn: 'root'
})
export class FraisService {


  constructor(private http: HttpClient) { }

  listeNotesDeFrais(idMission: number): Observable<Frais[]> {
    return this.http.get<Frais[]>(`${environment.baseUrl}frais/${idMission}`)
  }

// créer un frais en base
  creerFrais(idMission:number, fraisCree: Frais):Observable<Frais>{
    console.log(fraisCree);
    
    return this.http.post<Frais>(`${environment.baseUrl}frais/${idMission}`, fraisCree)
    .pipe(
      map(fraisBack => {
        let frais = new Frais;
        frais.id=fraisBack.id;
        frais.date=new Date(fraisBack.date);
        frais.natureFrais=fraisBack.natureFrais;
        frais.montantFrais=fraisBack.montantFrais;
        return frais;
      }
    ));
  }


  // modifier un frais en base
  modifierFrais(frais: Frais): Observable<any>{
    const body = {
      "date": frais.date,
      "natureFrais": frais.natureFrais,
      "montantFrais": frais.montantFrais
    }
  
  return this.http.patch<FraisBack>(`${environment.baseUrl}frais/${frais.id}`, body)
  .pipe(
    map(fraisBack => {
      let frais = new Frais;
      frais.date=new Date(fraisBack.date);
      frais.natureFrais=fraisBack.natureFrais;
      frais.montantFrais=fraisBack.montantFrais;
      return frais;
    }
  ))
  }


}
