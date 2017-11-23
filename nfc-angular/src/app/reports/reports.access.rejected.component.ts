import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ReportData } from '../shared/model/reportData';
import { Router } from '@angular/router';

@Component({
  selector: 'my-reports',
  templateUrl: './reports.access.rejected.component.html',
  styleUrls: ['./reports.access.rejected.component.scss']
})

export class ReportsDetailAccessRejectedComponent implements OnInit {
  private data: ReportData[] = [];
  private error: string;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getReport();
  }

  getReport(){
    this.api.getInfoAllRejectedSubeTag().subscribe((data: ReportData[]) => {
      this.data = data;
      console.log('rejected sube reporte data : ' + this.data);
    }, err => {
      this.error = err._body;
      console.log('Error : ' + this.error);      
    });
  }

  gotoReports() {
    this.router.navigate(['/reports']);
  }

}
