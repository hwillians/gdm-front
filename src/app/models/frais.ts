export class Frais{
    id: number;
    date: Date;
    natureFrais: string;
    montantFrais: number;
    modified: boolean = false; // tag modified pour validation note de frais
    new: boolean= false; // tag new pour validation note de frais

}
