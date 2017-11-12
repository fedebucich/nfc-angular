import { Component, Input } from "@angular/core";
import { ApiService } from "../../shared/api.service";
import { Employee, Status, ScheduleWorkTime } from "../../shared/model/employee";
import { StatusSelect, DayLabel, getDayLabel } from "./d";
import * as io from 'socket.io-client';
// import '../../style/app.scss';

@Component({
  selector: "employee-modal",
  templateUrl: "./edit-view.component.html",
  styleUrls: ["./edit-view.component.scss"]
})
export class EmployeeModalComponent {
  @Input() onFinish: Function;
  public employee: Employee = this.emptyEmployee();
  public receivedEmployee: Employee; 
  private allStatus: StatusSelect[] = this.initAllStatus();
  public visible = false;
  private visibleAnimate = false;
  private edit = true;
  private isNewEmployee = false;
  private url = 'http://localhost:3000';  
  private socket;
  private error;
  

  constructor(private api: ApiService) {}

  public show(edit: boolean, employee?: Employee): void {
    console.log(this.error, this.allStatus, this.isNewEmployee); 
    setTimeout(() => (this.visibleAnimate = true), 100);
    this.init(edit, employee);
    this.initSocket();
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.employee = this.emptyEmployee();
    setTimeout(() => (this.visible = false), 300);
    this.closeSocket();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains("modal")) {
      this.hide();
    }
  }

  private init(edit: boolean, employee?: Employee): void {    
    this.allStatus = this.initAllStatus();
    this.receivedEmployee = employee;
    this.employee = this.initEmployee(employee);
    this.edit = edit;
    this.visible = true;
    this.error = undefined;
    this.isNewEmployee = !employee;
  }

  private initSocket() {
    this.socket = io(this.url);
    this.socket.on('nfc-tag', (data) => {
      if(this.edit) {
        this.employee.nfcTag = data.text;
      }
    });
  }

  private closeSocket(){
    this.socket.disconnect();
  }

  public save(): void {
    this.api.createEmploye(this.employee).subscribe(data => {
      this.onFinish(data);
      this.hide();
    }, err => {
      this.error = err._body;
    });
  }

  public update(): void {
    this.api.updateEmploye(this.employee).subscribe((data) => {
      this.receivedEmployee.name = data.name;
      this.receivedEmployee.lastName = data.lastName;
      this.receivedEmployee.expedient = data.expedient;
      this.receivedEmployee.nfcTag = data.nfcTag;
      this.receivedEmployee.status = data.status;
      this.receivedEmployee.scheduleWorkTime = data.scheduleWorkTime;
      this.hide();
    }, err => {
      this.error = err._body;
    });
  }

  private initEmployee(employee: Employee): Employee {
    return employee ? Object.assign({}, employee) : this.emptyEmployee();
  }

  private initAllStatus(): StatusSelect[] {
    return [
      { status: "active", displayValue: "Activo" },
      { status: "inactive", displayValue: "Inactivo" },
      { status: "suspended", displayValue: "Suspendido" }
    ];
  }

  public getDayDisplayLabel(workDay: ScheduleWorkTime): DayLabel {
    return getDayLabel(workDay);
  }

  change(newValue){
    const h = newValue.split(":")[0]; 
    const m = newValue.split(":")[1]; 
    return new Date(1970, 0, 1, h, m, 0);
  }

  private emptyEmployee(): Employee {
    const status: Status = "active";
    return {
      _id: "",
      name: "",
      lastName: "",
      expedient: "",
      nfcTag: "",
      status: status,
      scheduleWorkTime: [
        { dayNumber: 1, timeFrom: new Date(1970, 0, 1, 9, 0, 0),timeTo: new Date(1970, 0, 1, 18, 0, 0) },
        { dayNumber: 2, timeFrom: new Date(1970, 0, 1, 9, 0, 0),timeTo: new Date(1970, 0, 1, 18, 0, 0) },
        { dayNumber: 3, timeFrom: new Date(1970, 0, 1, 9, 0, 0),timeTo: new Date(1970, 0, 1, 18, 0, 0) },
        { dayNumber: 4, timeFrom: new Date(1970, 0, 1, 9, 0, 0),timeTo: new Date(1970, 0, 1, 18, 0, 0) },
        { dayNumber: 5, timeFrom: new Date(1970, 0, 1, 9, 0, 0),timeTo: new Date(1970, 0, 1, 18, 0, 0) },
      ]
    };
  }
}
