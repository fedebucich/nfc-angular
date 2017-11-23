import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ReportData } from '../shared/model/reportData';
import { Router } from '@angular/router';

@Component({
  selector: 'my-reports',
  templateUrl: './reports.access.enter.today.component.html',
  styleUrls: ['./reports.access.enter.today.component.scss']
})

export class ReportsDetailAccessEnterTodayComponent implements OnInit {
  private data: ReportData[] = [];
  private error: string;
  
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
     this.getReport();
  }

  getReport(){
    this.api.getInfoAllEmployeeEnterToday().subscribe((data: ReportData[]) => {
      this.data = data;
      console.log('employee enter day reporte data : ' + this.data);
    }, err => {
      this.error = err._body;
      console.log('Error : ' + this.error);
    });
  }

  gotoReports() {
    this.router.navigate(['/reports']);
  }

}
