import { Component, OnInit } from '@angular/core';
import { Frais } from '../models/frais';
import { Mission } from '../models/mission';
import { FraisService } from '../services/frais.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-saisie-note-de-frais',
  templateUrl: './saisie-note-de-frais.component.html',
  styleUrls: ['./saisie-note-de-frais.component.scss']
})
export class SaisieNoteDeFraisComponent implements OnInit {


  //il faudra recuperer la vrai mission plus tard
  mission: Mission = new Mission(3);


  listfrais: Frais[]
  erreurTechnique = false;
  affichageAjouterFrais = false;
  fraisAModifier: Frais;

  fraisCree: Frais = new Frais;



  constructor(private fraisService: FraisService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  /// modal
  open(content): void {
    this.modalService.open(content);
  }

  close(): void {
    this.modalService.dismissAll();
    //window.location.reload();
  }
  ///


  ajouterFrais() {
    this.affichageAjouterFrais = true;
    //alert('un frais sera ajouté')
  }

  ajouter() {
    this.affichageAjouterFrais = false;
    // ajout du fraisCree dans la liste
    this.listfrais.push(this.fraisCree);

    ////test de post
    this.fraisService.creerFrais(3, this.fraisCree).subscribe();
    //
    // rénitialisation de fraisCree
    this.fraisCree = new Frais;

  }

  // supprime une ligne de frais
  supprimerFrais(id: number) {
    for (let i = 0; i < this.listfrais.length; ++i) {
      if (this.listfrais[i].id === id) {
        this.listfrais.splice(i, 1);
      }
    }
  }

  // affiche le formulaire de modification
  editionFrais(id: number) {
    for (let i = 0; i < this.listfrais.length; ++i) {
      if (this.listfrais[i].id === id) {
        this.fraisAModifier = this.listfrais[i];
      }
    }
  }

  annulerEditionFrais() {
    this.fraisAModifier = new Frais;
  }

  modifierFrais() {
    for (let i = 0; i < this.listfrais.length; ++i) {
      if (this.listfrais[i].id === this.fraisAModifier.id) {
        this.listfrais[i] = this.fraisAModifier;
      }
    }

    /// test patch
    //this.fraisService.modifierFrais()


    this.fraisAModifier = new Frais;
  }


  /// communication avec la BDD
  validerNoteDefrais() {

  }



  ngOnInit(): void {
    this.fraisService.listeNotesDeFrais(this.mission.id).subscribe(
      listf => this.listfrais = listf,
      error => this.erreurTechnique = true,
      () => { }
    )
  }




}
