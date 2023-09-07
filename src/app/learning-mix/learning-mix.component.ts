import { Component } from '@angular/core';
import { ButtonLabelName, getButtonLabel } from '../shared/button-name';
import { ASSETS_PATHS } from '../constants/assets-paths';

@Component({
  selector: 'app-learning-mix',
  templateUrl: './learning-mix.component.html',
  styleUrls: ['./learning-mix.component.css'],
})
export class LearningMixComponent {
  learningComponentTitle: string =
    'It is Learning component to test and learn.';
  titleStyleClass: string = 'learning-module-title';
  componentStates: { [key: string]: boolean } = {
    app_spinner_test: false,
    app_section5_task: false,
    app_servers: false,
    app_user_task: false,
    app_click_task: false,
  };
  private components: string[] = Object.keys(this.componentStates);
  mixImageSrc: string = ASSETS_PATHS.MIX_IMAGE_FILE_SOURCE;

  isComponentActive(name: string): boolean {
    return this.componentStates[name];
  }

  onBoardButtonClick(boardlButtonClicked: {
    componentName: string;
    isTurnedOn: boolean;
  }) {
    if (
      this.componentStates.hasOwnProperty(boardlButtonClicked.componentName)
    ) {
      this.componentStates[boardlButtonClicked.componentName] =
        boardlButtonClicked.isTurnedOn;
    }
  }

  get buttonLabelNames(): ButtonLabelName[] {
    let buttonLabelNames: ButtonLabelName[] = [];
    Object.keys(this.componentStates).forEach((component) =>
      buttonLabelNames.push(getButtonLabel(component))
    );
    return buttonLabelNames;
  }
}
