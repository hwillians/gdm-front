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
  mission: Mission = new Mission(3, null, null, null, null, null, null, null, null);

  listfrais: Frais[]
  erreurTechnique = false;
  affichageAjouterFrais = false;
  fraisAModifier: Frais;
  indexASupprimer: number;

  fraisCree: Frais = new Frais;



  constructor(private fraisService: FraisService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.fraisService.listeNotesDeFrais(this.mission.id).subscribe(
      listf => this.listfrais = listf,
      error => this.erreurTechnique = true,
      () => { }
    )
  }

  /// modal
  open(content): void {
    this.modalService.open(content);
  }

  openModification(content, index): void {
    this.editionFrais(index);
    this.modalService.open(content);
  }

  openSuppression(content, index): void {
    this.indexASupprimer = index; 
    this.modalService.open(content);
  }

  close(): void {
    this.modalService.dismissAll();
  }

  closeSupprimer(): void {
    this.modalService.dismissAll();
    this.supprimerFrais = null;
  }
  /// fin modal

  // ajout d'un frais à la liste
  ajouter() {
    this.fraisCree.new = true;
    this.listfrais.push(this.fraisCree);
    // rénitialisation de fraisCree
    this.fraisCree = new Frais;
    this.modalService.dismissAll();
  }


  // assignation du frais à modifier
  editionFrais(index: number) {
    this.fraisAModifier = this.listfrais[index];
  }

  // modification d'un frais dans la liste
  modifierFrais() {
    for (let i = 0; i < this.listfrais.length; ++i) {
      if (this.listfrais[i].id === this.fraisAModifier.id) {
        this.fraisAModifier.modified = true;
        this.listfrais[i] = this.fraisAModifier;
      }
    }

    this.fraisAModifier = new Frais;
    this.modalService.dismissAll();
  }


  // supprime une ligne de frais dans la liste et la BDD
  supprimerFrais() {
    if (this.listfrais[this.indexASupprimer].new) {
      this.listfrais.splice(this.indexASupprimer, 1);
    } else {
      this.fraisService.supprimerFrais(this.listfrais[this.indexASupprimer]).subscribe();
      this.listfrais.splice(this.indexASupprimer, 1);
    }
    this.closeSupprimer();
  }



  /// communication avec la BDD
  // validation de la note de frais
  validerNoteDefrais() {
    this.listfrais.forEach(frais => {
      if (frais.new) {
        // TODO mettre à jour l'id de la mission
        this.fraisService.creerFrais(3, frais).subscribe(res => {
          frais.new = false;
        });
      } else if (frais.modified) {
        // TODO mettre à jour l'id de la mission
        this.fraisService.modifierFrais(frais).subscribe(res => {
          frais.modified = false;
        });
      }
    });
    alert('La note de frais est validée !');

  }








}
