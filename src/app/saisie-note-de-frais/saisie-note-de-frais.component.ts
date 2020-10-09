import { Component, OnInit } from '@angular/core';
import { Frais } from '../models/frais';
import { Mission } from '../models/mission';
import { FraisService } from '../services/frais.service';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {


  //il faudra recuperer la vrai mission plus tard
  mission:Mission = new Mission(3 )
  
  listfrais: Frais[]
  erreurTechnique = false;

  constructor(private fraisService: FraisService) { }

  ajouterFrais(){
    alert('un frais sera ajouté')
  }

  supprimerFrais(){
    alert('le frais sera supprimé')
  }

  editerFrais(){
    alert('le frais sera modifié')
  }

  ngOnInit(): void {
    this.fraisService.listeNotesDeFrais(this.mission.id).subscribe(
      listf => this.listfrais = listf,
      error => this.erreurTechnique = true,
      () => { }
    )
  }

}
