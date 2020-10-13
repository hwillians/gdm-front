import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-gestion-frais',
  templateUrl: './gestion-frais.component.html',
  styleUrls: ['./gestion-frais.component.scss']
})
export class GestionFraisComponent implements OnInit {

  listeMissions: Mission[];

  constructor() { }

  ngOnInit(): void {
  }

}
