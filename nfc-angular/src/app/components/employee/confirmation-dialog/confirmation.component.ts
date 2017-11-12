import { Component, Input } from "@angular/core";
// import '../../style/app.scss';

@Component({
  selector: "confimation-modal",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.scss"]
})
export class ConfirmationComponent {
  private message: string;
  public visible = false;
  private visibleAnimate = false;
  private index: number;
  @Input() onAgreed: Function;


  constructor() {
    console.log(this.message, this.index);
  }

  public show(message: string, index: number): void {
    this.visible = true;
    this.index = index;
    setTimeout(() => (this.visibleAnimate = true), 100);
    this.message = message;
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => (this.visible = false), 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains("modalConfirmation")) {
      this.hide();
    }
  }

  public delete() {
    this.onAgreed(this.index);
    this.hide();
  }
}
