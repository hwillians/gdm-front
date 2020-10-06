import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Frais } from '../models/frais';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor(private http: HttpClient) { }

  listeNotesDeFrais():Observable<Frais[]>{
    return this.http.get<Frais[]>(`${environment.baseUrl}frais`)
  }
}
