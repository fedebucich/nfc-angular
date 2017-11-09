import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Employee, Status } from "../shared/model/employee";
import { getDisplayValue, DisplayValue } from "../components/employee/d";
import { FilterType } from "./filter";
import { StatusSelect } from "../components/employee/d";
import "../../style/app.scss";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private data: Employee[] = [];
  private filterArgs: FilterType = { txt: "" };
  private allStatus: StatusSelect[] = this.initAllStatus();
  private displayStatus = "active";

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log(this.filterArgs, this.allStatus, this.getDisplayStatus, this.displayStatus);
    this.getEmployees();
  }

  getEmployees() {
    if (this.displayStatus !== "Todos") {
      this.api.getEmployeesByStatus(this.displayStatus).subscribe((data: Employee[]) => {
        this.data = data;
      });
    } else {
      this.api.getEmployees().subscribe((data: Employee[]) => {
        this.data = data;
      });
    }
  }

  onFinish = (employee: Employee) => {
    this.data.push(employee);
  };

  remove(index: number) {
    this.api.removeEmploye(this.data[index]).subscribe((data: Employee) => {
      this.data[index] = data;
    });
  }

  onChange() {
    this.getEmployees();
}

  getDisplayStatus(status: Status): DisplayValue {
    return getDisplayValue(status);
  }

  private initAllStatus(): StatusSelect[] {
    return [
      { status: "Todos", displayValue: "Todos" },
      { status: "active", displayValue: "Activo" },
      { status: "inactive", displayValue: "Inactivo" },
      { status: "suspended", displayValue: "Suspendido" }
    ];
  }
}
