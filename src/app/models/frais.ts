// export class Frais {
//     constructor(private id:number, private date:Date, private  natureFrais:string, private montantFrais:string){}
// }

export class Frais{
    id: number;
    date: Date;
    natureFrais: string;
    montantFrais: number;
    modified: boolean = false;
    new: boolean= false;

}
