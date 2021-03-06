import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Employee } from "./model/employee"
import { Observable } from "rxjs"
import { ReportData } from "./model/reportData"
import "rxjs/add/operator/map";
const API_ROOT = "http://localhost:3000/api/";

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  getEmployees = (): Observable<Employee[]> => {
    return this.http.get(API_ROOT + "employee").map(data => {
      console.log("GET ALL EMPLOYEE RESULT: ", data.json());
      return data.json();
    });
  };

  getEmployeesByStatus = (status: string): Observable<Employee[]> => {
    return this.http.get(API_ROOT + "employee" + "/byStatus/" + status).map(data => {
      console.log("GET ALL EMPLOYEE RESULT: ", data.json());
      return data.json();
    });
  };

  updateEmploye = (employee: Employee): Observable<Employee> => {
    return this.http
      .put(API_ROOT + "employee/" + employee._id, employee)
      .map(data => {
        console.log("Update EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  createEmploye = (employee: Employee): Observable<Employee> => {
    return this.http
      .post(API_ROOT + "employee/", employee)
      .map(data => {
        console.log("Update EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  removeEmploye = (employee: Employee): Observable<Employee> => {
    return this.http
      .delete(API_ROOT + "employee/" + employee._id)
      .map(data => {
        console.log("Delete EMPLOYEE RESULT: ", data.json());
        return data.json();
      });
  };

  getInfoAllRejectedSubeTag = (): Observable<ReportData[]> => {
    return this.http.get(API_ROOT + "reports/byRejectedSubeTag").map(data => {
      console.log("GET ALL REJECTED SUBE TAG REPORT DATA: ", data.json());
      return data.json();
    });
  };

  getInfoAllEmployeeEnterToday = (): Observable<ReportData[]> => {
    return this.http.get(API_ROOT + "reports/byEmployeeEnterToday").map(data => {
      console.log("GET ALL EMPLOYEES ENTER TODAY REPORT DATA: ", data.json());
      return data.json();
    });
  };
}
