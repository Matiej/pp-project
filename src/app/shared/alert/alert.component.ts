import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Output()
  closeAlertEmiter: EventEmitter<void> = new EventEmitter();

  @Input()
  alertMessage: string = '';

  onClose() {
    this.closeAlertEmiter.emit();
  }
}
