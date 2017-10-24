import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  
   	private data : any;

  	constructor(private api: ApiService) { }

	ngOnInit() {
		 this.api.getEmployees().subscribe(
		      data => {
		          this.data = data;
		          console.log('EMPLOYEE FOUND: ', this.data);
		      }
		);
	}

	remove(employee: any) {
      // this.data = _.filter(this.data, (elem)=>elem!=employee);
      console.log("Remove employee ID: ", employee._id);
    }

    edit(employee: any){
    	console.log("Edit employee ID: ", employee._id);
    }
}
