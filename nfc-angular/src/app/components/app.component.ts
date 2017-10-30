import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import "../../style/app.scss";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private data: any = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEmployees().subscribe(data => {
      this.data = data;
    });
  }

  onFinish = (employee: any) => {
    this.data.push(employee);
  };

  remove(index: any) {
    this.api.removeEmploye(this.data[index]).subscribe(data => {
      this.data[index] = data;
    });
  }
}
