import { Component, Input } from "@angular/core";
import { ApiService } from "../../shared/api.service";
import { Employee, Status, ScheduleWorkTime } from "../../shared/model/employee";
import { StatusSelect, DayLabel, getDayLabel } from "./d";
// import '../../style/app.scss';

@Component({
  selector: "employee-modal",
  templateUrl: "./edit-view.component.html",
  styleUrls: ["./edit-view.component.scss"]
})
export class EmployeeModalComponent {
  @Input() onFinish: Function;
  public employee: Employee = this.emptyEmployee();  
  private allStatus: StatusSelect[] = this.initAllStatus();
  public visible = false;
  private visibleAnimate = false;
  private edit = true;
  private isNewEmployee = false;
  private nfcTag: string;

  constructor(private api: ApiService) {}

  public show(edit: boolean, employee?: Employee): void {
    setTimeout(() => (this.visibleAnimate = true), 100);
    this.init(edit, employee);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains("modal")) {
      this.hide();
    }
  }

  private init(edit: boolean, employee?: Employee): void {
    this.initNfcTag();
    this.allStatus = this.initAllStatus();
    this.employee = this.initEmployee(employee);
    this.edit = edit;
    this.visible = true;
    this.isNewEmployee = !employee;
  }

  private initNfcTag(): void {
    this.api.getCode().subscribe(data => {
      const nfcTag: string = data[0].nfcTag;
      if (this.isNewEmployee) {
        this.employee.nfcTag = nfcTag;
      } else {
        this.nfcTag = nfcTag;
      }
    });
  }

  public save(): void {
    this.api.createEmploye(this.employee).subscribe(data => {
      this.onFinish(data);
      this.hide();
    });
  }

  public update(): void {
    this.api.updateEmploye(this.employee).subscribe(() => {
      this.hide();
    });
  }

  private initEmployee(employee: Employee): Employee {
    return employee ? employee : this.emptyEmployee();
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