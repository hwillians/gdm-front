import { Collegue } from '../auth/auth.domains';

export class Mission {

    collegue: Collegue; // test avec un collegue

    constructor(public id: number,
        public dateDebut: Date,
        public dateFin: Date,
        public nomNature: string,
        public villeDepart: string,
        public villeArrivee: string,
        public transport: string,
        public statut: string,
        public prime: any
        ) { } 
}



