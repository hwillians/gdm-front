import { Role } from './role';

export class Collegue {

    constructor(
        id: number,
        nom: string,
        prenom: string,
        email: string,
        motDePasse: string,
        roles: Role[],
        manager?: Collegue
    ) { }

}