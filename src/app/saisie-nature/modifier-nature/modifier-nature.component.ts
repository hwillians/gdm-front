import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from 'src/app/models/mission';
import { Nature } from 'src/app/models/nature';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-modifier-nature',
  templateUrl: './modifier-nature.component.html',
  styleUrls: ['./modifier-nature.component.scss']
})
export class ModifierNatureComponent implements OnInit {

  @Input()
  nature: Nature = new Nature();
  listeMissions: Mission[];
  listeNatures: Nature[];

  
  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
  }

  close(): void {
    this.modalService.dismissAll();
    window.location.reload();
  }

  open(content): void {
    this.modalService.open(content);
  }

  valider(): void {
    console.log("newNature ", this.nature);

    if (!this.nature.missionFacturee) {
      this.nature.missionFacturee = false;
      this.nature.tjm = 0;
    }
    if (!this.nature.versementPrime) {
      this.nature.versementPrime = false;
      this.nature.pourcentagePrime = 0;
    }
    setTimeout(() => {
      this.service.modifierNature(this.nature.id, this.nature);
    }, 1000);
  }
    

}
