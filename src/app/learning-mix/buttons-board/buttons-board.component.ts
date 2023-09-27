import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonLabelName, getComponentName } from 'src/app/shared/button-name';
import { LearningMixSharedService } from '../learning-mix-shared.service';

@Component({
  selector: 'app-buttons-board',
  templateUrl: './buttons-board.component.html',
  styleUrls: ['./buttons-board.component.css'],
})
export class ButtonsBoardComponent implements OnInit {
  constructor(private learningSharedService: LearningMixSharedService) {}

  @Input({ required: true })
  linebuttonLables: ButtonLabelName[] = [];

  @Output()
  boardlButtonClicked: EventEmitter<{
    componentName: string;
    isTurnedOn: boolean;
  }> = new EventEmitter();

  ngOnInit(): void {
    this.learningSharedService.tunOnSectionEmiter.subscribe(
      (button: ButtonLabelName) => {
        this.onBoardButtonClick({ buttonLabel: button, isTurnedOn: true });
      }
    );
  }

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
