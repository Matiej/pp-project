import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonLabelName, getComponentName } from 'src/app/shared/button-name';

@Component({
  selector: 'app-buttons-board',
  templateUrl: './buttons-board.component.html',
  styleUrls: ['./buttons-board.component.css'],
})
export class ButtonsBoardComponent {
  spinnerTestButtonLabel: ButtonLabelName = ButtonLabelName.SPINNER_TEST;
  @Input({required: true})
  buttonLables: ButtonLabelName[] = [];

  @Output()
  boardlButtonClicked: EventEmitter<{
    componentName: string;
    isTurnedOn: boolean;
  }> = new EventEmitter();

  onBoardButtonClick(controlButtonClicked: {
    buttonLabel: ButtonLabelName;
    isTurnedOn: boolean;
  }): void {
    this.boardlButtonClicked.emit({
      componentName: getComponentName(controlButtonClicked.buttonLabel),
      isTurnedOn: controlButtonClicked.isTurnedOn,
    });
  }
}
