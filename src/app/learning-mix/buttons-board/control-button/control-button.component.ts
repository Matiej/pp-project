import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonLabelName } from 'src/app/shared/button-name';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.css'],
})
export class ControlButtonComponent {
  @Input({ required: true })
  controlButtonLabel?: ButtonLabelName;
  buttonName: string = 'TurnOn';
  buttonClass: string = 'btn btn-success';

  @Output()
  controlButtonClicked: EventEmitter<{
    buttonLabel: ButtonLabelName;
    isTurnedOn: boolean;
  }> = new EventEmitter();

  onControlButtonClick(): void {
    if (this.buttonName === 'TurnOff') {
      this.controlButtonClicked.emit({
        buttonLabel: this.controlButtonLabel!,
        isTurnedOn: false,
      });
      this.buttonName = 'TurnOn';
      this.buttonClass = 'btn btn-success';
    } else {
      this.buttonName = 'TurnOff';
      this.buttonClass = 'btn btn-danger';
      this.controlButtonClicked.emit({
        buttonLabel: this.controlButtonLabel!,
        isTurnedOn: true,
      });
    }
  }
}
