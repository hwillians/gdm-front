import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/auth/auth.service';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

export class graph {
  constructor(public annee: any, public option?: any) {
    option = {
      chart: { type: 'column' },
      title: { text: 'Primes Année ' + annee },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      },
      yAxis: { min: 0, title: { text: 'Rainfall (mm)' } },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

      }]
    }
  }

}



@Component({
  selector: 'app-primes',
  templateUrl: './primes.component.html',
  styleUrls: ['./primes.component.scss']
})
export class PrimesComponent implements OnInit {

  collegue: Collegue
  listMission: Mission[]
  listAnnee: string[]
  anneeSelect: string
  erreurTechnique = false

  constructor(private missionService: MissionService,
    private authService: AuthService) { }


  getAnnee(date: Date): string {
    return date.toString().split("-")[0]
  }

  listerAnne() {
    this.listAnnee = [];
    for (let mission of this.listMission) {
      if (!this.listAnnee.includes(this.getAnnee(mission.dateFin))) {
        this.listAnnee.push(this.getAnnee(mission.dateFin))
      }
    }
  }




  alert(annee: string) {
    this.authService.collegueConnecteObs.subscribe(
      col => {
        this.collegue = col;
        this.missionService.listeMissions(this.collegue.id).subscribe(
          listM => {
            this.listMission = listM.filter(mission => new Date(mission.dateFin) < new Date());
            this.listerAnne();
            this.listMission = this.listMission.filter(mission => new Date(mission.dateFin) >= new Date(parseInt(annee), 0, 1) && new Date(mission.dateFin) <= new Date(parseInt(annee), 11, 31))
          },
        );
      })
  }
  fileName= 'ExcelSheet.xlsx'

  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('excel-table'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  ngOnInit(): void {

    this.authService.collegueConnecteObs.subscribe(
      col => {
        this.collegue = col;
        this.missionService.listeMissions(this.collegue.id).subscribe(
          listM => {
            this.listMission = listM.filter(mission => new Date(mission.dateFin) < new Date());
            this.listerAnne();
          },
          () => this.erreurTechnique = true,
        );
      })





  }
}
