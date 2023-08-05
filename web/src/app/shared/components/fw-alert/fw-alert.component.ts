import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fw-alert',
  templateUrl: './fw-alert.component.html',
  styleUrls: ['./fw-alert.component.css']
})
export class FwAlertComponent {
  @Input({required: true}) alertType: "none" | "warn" | "error" | "info" = "none";
  @Input() alertMessage: string = '';

  public hideAlert() {
    this.alertMessage = "";
  }
}
