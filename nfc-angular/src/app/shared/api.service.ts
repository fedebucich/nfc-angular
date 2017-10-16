import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
const API_ROOT = 'http://localhost:3000/api/';

@Injectable()
export class ApiService {
  title = 'Angular 2';
  constructor(private http: Http) { }

  getEmployees = () => {
    return this.http.get(API_ROOT + 'employee')
    .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.json();
    // let body = res.json();
    // return body.data || { };
  }
}
