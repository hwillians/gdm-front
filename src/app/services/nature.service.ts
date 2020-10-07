import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nature  } from "../models/nature";
@Injectable({
  providedIn: 'root'
})
export class NatureService {

  constructor(private http: HttpClient) { }

  listeNatures():Observable<Nature[]>{
    return this.http.get<Nature[]>(`${environment.baseUrl}natures/`)
  }
}
