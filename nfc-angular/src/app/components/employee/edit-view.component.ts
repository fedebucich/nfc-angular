import { Component, Input } from "@angular/core";
import { ApiService } from "../../shared/api.service";
import { Employee } from "../../shared/model/employee";
// import '../../style/app.scss';

@Component({
  selector: "employee-modal",
  templateUrl: "./edit-view.component.html",
  styleUrls: ["./edit-view.component.scss"]
})
export class EmployeeModalComponent {
  @Input() onFinish: Function;

  public employee: Employee = this.emptyEmployee();
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

  private init(edit: boolean, employee?: Employee) : void{
    this.initNfcTag();
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

  private emptyEmployee() {
    return {
      _id: "",
      name: "",
      lastName: "",
      expedient: "",
      nfcTag: "",
      status: "",
      scheduleWorkTime: []
    };
  }
}
