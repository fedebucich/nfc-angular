import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
const API_ROOT = "http://localhost:3000/api/";

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  getEmployees = () => {
    return this.http.get(API_ROOT + "employee").map(data => {
      console.log("GET ALL EMPLOYEE RESULT: ", data.json());
      return data.json();
    });
  };

  updateEmploye = (employee: any) => {
    return this.http
      .put(API_ROOT + "employee/" + employee._id, employee)
      .map(data => {
        console.log("Update EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  createEmploye = (employee: any) => {
    return this.http
      .post(API_ROOT + "employee/", employee)
      .map(data => {
        console.log("Update EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  removeEmploye = (employee: any) => {
    return this.http
      .delete(API_ROOT + "employee/" + employee._id, employee)
      .map(data => {
        console.log("Delete EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  getCode = () => {
    return this.http.get(API_ROOT + "/code").map(data => {
      console.log("GET Code RESULT: ", data.json());
      return data.json();
    });
  };
}
