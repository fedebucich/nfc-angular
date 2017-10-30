import { Component , Input} from "@angular/core";
import { ApiService } from "../../shared/api.service";
// import '../../style/app.scss';

@Component({
  selector: "employee-modal",
  templateUrl: "./edit-view.component.html",
	styleUrls: ["./edit-view.component.scss"],
	
})
export class EmployeeModalComponent {
	@Input() onFinish: Function;
	
	public employee: any = {};
  public visible = false;
  private visibleAnimate = false;
	private edit = true;
	private newEmployee = false;

  constructor(private api: ApiService) {}

  public show(employee: string, edit: boolean): void {
		if (!employee) {
			this.api.getCode().subscribe(data => {
				this.newEmployee = true;
				this.employee = {
					name: "",
					lastName: "",
					expedient: "",
					nfcTag: data[0].nfcTag,
					status: "",
					scheduleWorkTime: []
				}
			});			
		} else {
			this.employee = employee;
		}
		this.edit = edit;
		this.visible = true;
    setTimeout(() => (this.visibleAnimate = true), 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 300);
  }

  public save() {
		if (this.newEmployee) {
			this.api.createEmploye(this.employee).subscribe(data => {
				this.onFinish(data);
				console.log("EMPLOYEE updated: ", data);
			});
		} else {
			this.api.updateEmploye(this.employee).subscribe(data => {
				console.log("EMPLOYEE updated: ", data);
			});
		}
    this.hide();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains("modal")) {
      this.hide();
    }
  }
}
