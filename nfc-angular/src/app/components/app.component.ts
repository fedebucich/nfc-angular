import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { LocalDataSource } from 'ng2-smart-table';

import '../../style/app.scss';

@Component({
  selector: 'my-app', // <my-app></my-app>,
 // templateUrl: './app.component.html',
 template: '<input #search class="search" type="text" placeholder="Search..." (keydown.enter)="onSearch(search.value)"> <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>',
 styleUrls: ['./app.component.scss'],
  
  
})

export class AppComponent implements OnInit {

	settings = {
		columns: {		 
		  name: {
			title: 'name',
			filter: false
		  },
		  lastName: {
			title: 'lastName',
			filter: false
		  },
		  expedient: {
			title: 'expedient',
			filter: false
		  },
		  nfcTag:{
			title: 'nfcTag',
			filter: false  
		  }

		}
	  };
   	private data : any;
	source: LocalDataSource;
  	

	ngOnInit() {
		 this.api.getEmployees().subscribe(
		      data => {
				  this.data = data;
				 
		          console.log('EMPLOYEE FOUND: ', this.data);
		      }
		);
		
	}
	constructor(private api: ApiService) { this.source = new LocalDataSource(this.data); }
	  onSearch(query: string = '') {
		this.source.setFilter([
		  // fields we want to include in the search
		  {
			field: 'name',
			search: query
		  },
		  {
			field: 'lastName',
			search: query
		  },
		  {
			field: 'expedient',
			search: query
		  },
		  {
			field: 'nfcTag',
			search: query
		  }
		], false); 
		// second parameter specifying whether to perform 'AND' or 'OR' search 
		// (meaning all columns should contain search query or at least one)
		// 'AND' by default, so changing to 'OR' by setting false here
	  }
	/*remove(employee: any) {
      // this.data = _.filter(this.data, (elem)=>elem!=employee);
      console.log("Remove employee ID: ", employee._id);
    }

    edit(employee: any){
    	console.log("Edit employee ID: ", employee._id);
    }*/
}
