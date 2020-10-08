import { Component, OnInit } from '@angular/core';
import { Nature } from 'src/app/models/nature';
import { NatureService } from 'src/app/services/nature.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ajout-nature',
  templateUrl: './ajout-nature.component.html',
  styleUrls: ['./ajout-nature.component.scss']
})
export class AjoutNatureComponent implements OnInit {

newNature : Nature = new Nature();

constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) {
  this.newNature.tjm = 0;
  this.newNature.pourcentagePrime = 0;
  config.backdrop = 'static';
  config.keyboard = false;
}

  ngOnInit(): void {
  }

   // modal
   open(content): void {
    this.modalService.open(content);
  }

  close(): void {
    this.modalService.dismissAll();
    this.newNature = new Nature();
    this.newNature.tjm = 0;
    this.newNature.pourcentagePrime = 0;
    window.location.reload();
  }

  valider(): void {
    if (!this.newNature.missionFacturee) {
      this.newNature.missionFacturee = false;
      this.newNature.tjm = 0;
    }
    if (!this.newNature.versementPrime) {
      this.newNature.versementPrime = false;
      this.newNature.pourcentagePrime = 0;
    }
    setTimeout(() => {
      this.service.ajouterNature(this.newNature);
      window.location.reload();
    }, 1000);
  }

}
