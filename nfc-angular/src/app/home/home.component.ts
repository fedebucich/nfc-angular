import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

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
