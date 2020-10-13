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
  mission: Mission = new Mission(3, new Date("2020-01-01"), new Date("2020-01-03"), null, null, null, null, null, null);

  listfrais: Frais[]
  erreurTechnique = false;
  affichageAjouterFrais = false;
  fraisAModifier: Frais;
  indexAModifier: number;
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
    this.indexASupprimer = null;
  }
  /// fin modal

  dateIsValide(date: Date): boolean {
    return new Date(date) >= new Date(this.mission.dateDebut) &&
      new Date(date) <= new Date(this.mission.dateFin)
  }

  fraisIsUnique(frais: Frais, indexExclusion:number): boolean {
    var isUnique = true;
    for (let i = 0; i < this.listfrais.length; ++i) {
      if (i != indexExclusion) {
        if (frais.date === this.listfrais[i].date && frais.natureFrais === this.listfrais[i].natureFrais) {
          isUnique = false;
        }
      }
    }
    return isUnique;
  }

  // ajout d'un frais à la liste
  ajouter() {
    this.fraisCree.new = true;
    let isUnique = true;

    // vérification de la date
    if (this.dateIsValide(this.fraisCree.date)) {

      // contrainte : couple date/nature doit être unique
      if (!this.fraisIsUnique(this.fraisCree, null)) {
        alert('Le couple date/nature doit être unique');
      }
      else {
        this.listfrais.push(this.fraisCree);
        // rénitialisation de fraisCree
        this.fraisCree = new Frais;
        this.modalService.dismissAll();
      }
    } else {
      alert("Date invalide");
    }
  }


  // assignation du frais à modifier
  editionFrais(index: number) {
    this.fraisAModifier = new Frais();
    this.fraisAModifier.id = this.listfrais[index].id;
    this.fraisAModifier.date = this.listfrais[index].date;
    this.fraisAModifier.natureFrais = this.listfrais[index].natureFrais;
    this.fraisAModifier.montantFrais = this.listfrais[index].montantFrais;
    this.fraisAModifier.new = this.listfrais[index].new;
    this.fraisAModifier.modified = this.listfrais[index].modified;
    this.indexAModifier = index;
  }

  // modification d'un frais dans la liste
  modifierFrais() {

    if (this.dateIsValide(this.fraisAModifier.date) && this.fraisIsUnique(this.fraisAModifier, this.indexAModifier)) {
      this.fraisAModifier.modified = true;
      this.listfrais[this.indexAModifier] = this.fraisAModifier;
      this.fraisAModifier = new Frais;
      this.indexAModifier = null;
      this.modalService.dismissAll();
    } else if (!this.dateIsValide(this.fraisAModifier.date)) {
      alert("Date invalide");
    } else {
      alert('Le couple date/nature doit être unique');
    }
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
    let nbFraisModifies = 0;
    let nbFraisAjoutes = 0;
    this.listfrais.forEach(frais => {
      if (frais.new) {
        nbFraisAjoutes ++;
        // TODO mettre à jour l'id de la mission automatiquement
        this.fraisService.creerFrais(3, frais).subscribe(res => {
          frais.new = false;
        });
      } else if (frais.modified) {
        nbFraisModifies ++;
        this.fraisService.modifierFrais(frais).subscribe(res => {
          frais.modified = false;

        });
      }
    });
    alert('La note de frais est validée ! ' + nbFraisAjoutes + ' frais ajoutés, ' + nbFraisModifies + ' frais modifiés' );
    window.location.reload();

  }








}
