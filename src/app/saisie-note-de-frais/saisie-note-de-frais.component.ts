import { Component, OnInit } from '@angular/core';
import { Frais } from '../models/frais';
import { FraisService } from '../services/frais.service';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {

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
    this.fraisService.listeNotesDeFrais().subscribe(
      listf => this.listfrais = listf,
      error => this.erreurTechnique = true,
      () => { }
    )
  }

}
