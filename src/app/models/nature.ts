export class Nature {

    constructor( private id:number,
                 private nom:string, 
                 private missionFacturee:boolean,
                 private versementPrime:boolean,
                 private tjm:string,
                 private pourcentagePrime:string,
                 private plafond:string,
                 private plafondDepassable:boolean,
                 private debutValidite:Date,
                 private finValidite:Date
                  ){}
}
