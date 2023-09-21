import { Component, OnInit } from '@angular/core';
import { ASSETS_PATHS } from '../constants/assets-paths';
import { ButtonLabelName, getButtonLabel } from '../shared/button-name';

@Component({
  selector: 'app-learning-mix',
  templateUrl: './learning-mix.component.html',
  styleUrls: ['./learning-mix.component.css'],
})
export class LearningMixComponent implements OnInit {
  learningComponentTitle: string =
    'It is Learning component to test and learn.';
  titleStyleClass: string = 'learning-module-title';
  firsLineComponentStates: { [key: string]: boolean } = {
    app_spinner_test: false,
    app_section5_task: false,
    app_servers: false,
    app_user_task: false,
    app_click_task: false,
    app_section7_directives: false,
  };
  mixImageSrc: string = '';
  secondLineComponentStates: { [key: string]: boolean } = {
    app_section9_task_user: false,
    app_outstanding_task1: false,
  };

  ngOnInit(): void {
    this.setRadommixImageSrc();
  }

  isComponentActive(name: string): boolean {
    return this.firsLineComponentStates[name] 
    || this.secondLineComponentStates[name];
  }

  private setRadommixImageSrc(): void {
    const learningMixImages: string[] = [
      ASSETS_PATHS.MIX_IMAGE_FILE_SOURCE_1,
      ASSETS_PATHS.MIX_IMAGE_FILE_SOURCE_2,
      ASSETS_PATHS.MIX_IMAGE_FILE_SOURCE_3,
      ASSETS_PATHS.MIX_IMAGE_FILE_SOURCE_4,
    ];
    const randomIndex: number = Math.round(
      Math.random() * (learningMixImages.length - 1)
    );
    this.mixImageSrc = learningMixImages[randomIndex];
  }

  onBoardButtonClick(boardlButtonClicked: {
    componentName: string;
    isTurnedOn: boolean;
  }) {
    if (this.firsLineComponentStates.hasOwnProperty(boardlButtonClicked.componentName)) {
      this.firsLineComponentStates[boardlButtonClicked.componentName] =
        boardlButtonClicked.isTurnedOn;
    }
    if (this.secondLineComponentStates.hasOwnProperty(boardlButtonClicked.componentName)) {
      this.secondLineComponentStates[boardlButtonClicked.componentName] =
        boardlButtonClicked.isTurnedOn;
    }
    this.setRadommixImageSrc();
  }

  get firstLinebuttonLabelNames(): ButtonLabelName[] {
    let buttonLabelNames: ButtonLabelName[] = [];
    Object.keys(this.firsLineComponentStates).forEach((component) =>
      buttonLabelNames.push(getButtonLabel(component))
    );
    return buttonLabelNames;
  }

  get secondLineButtonLabelNames(): ButtonLabelName[] {
    let buttonLabelNames: ButtonLabelName[] = [];
    Object.keys(this.secondLineComponentStates).forEach((component) =>
      buttonLabelNames.push(getButtonLabel(component))
    );
 
    return buttonLabelNames;
  }
}
