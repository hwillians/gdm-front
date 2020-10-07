import { Component, OnInit } from '@angular/core';
import { Nature } from "../models/nature";
import { NatureService } from "../services/nature.service";
@Component({
  selector: 'app-saisie-nature',
  templateUrl: './saisie-nature.component.html',
  styleUrls: ['./saisie-nature.component.scss']
})
export class SaisieNatureComponent implements OnInit {

  listNatures:Nature[]
  erreurTechnique = false;


  constructor(private NatureService:NatureService) { }

  ajouterNature(){
    alert('une nature de mission sera ajoutée')
  }

  supprimerNature(){
    alert('une nature de mission sera supprimée')
  }

  editerNature(){
    alert('une nature de mission sera modifiée')
  }

  ngOnInit(): void {

    this.NatureService.listeNatures().subscribe(
      listNature => this.listNatures = listNature,
      error => this.erreurTechnique = true,
      () => { }
    )
  }

}
