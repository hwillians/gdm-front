import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Nature } from 'src/app/models/nature';
import { NatureService } from 'src/app/services/nature.service';

@Component({
  selector: 'app-supprimer-nature',
  templateUrl: './supprimer-nature.component.html',
  styleUrls: ['./supprimer-nature.component.scss']
})
export class SupprimerNatureComponent implements OnInit {
  
  @Input()
  nature: Nature = new Nature();

  
  constructor(private service: NatureService, config: NgbModalConfig, private modalService: NgbModal) { }

 

  
  ngOnInit(): void {
    
  }

  close(): void {
    this.modalService.dismissAll();
  }

  supprimer(nature): void {
    this.service.deleteNature(nature.id).subscribe(
      () => { },
      err => console.log(err)
    );
    window.location.reload();
  }

  open(content): void {
    this.modalService.open(content);
  }

}
