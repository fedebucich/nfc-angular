import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'my-home',
  templateUrl: './Api.component.html',
  styleUrls: ['./Api.component.scss']
})

export class ApiComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
      this.api.getEmployees().subscribe(
        x => {
            console.log('VALUE RECEIVED: ', x);
        },
        x => {
            console.log('ERROR: ', x);
        },
        () => {
            console.log('Completed');
        }
      );
  }

}
