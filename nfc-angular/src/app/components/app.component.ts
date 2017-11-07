import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { Employee, Status } from "../shared/model/employee"
import { getDisplayValue, DisplayValue } from "../components/employee/d"
import "../../style/app.scss";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private data: Employee[] = [];
  private filterArgs = { txt: "" }

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log(this.filterArgs);
    this.api.getEmployees().subscribe((data: Employee[]) => {
      this.data = data;
    });
  }

  onFinish = (employee: Employee) => {
    this.data.push(employee);
  };

  remove(index: number) {
    this.api.removeEmploye(this.data[index]).subscribe((data: Employee) => {
      this.data[index] = data;
    });
  }

  getDisplayStatus(status: Status): DisplayValue {
    return getDisplayValue(status);
  }

}
