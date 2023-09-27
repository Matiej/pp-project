import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ButtonLabelName } from '../shared/button-name';

@Injectable({
  providedIn: 'root',
})
export class LearningMixSharedService {
  private _tunOnSectionEmiter: ReplaySubject<ButtonLabelName> =
    new ReplaySubject(1);

  constructor() {}

  turnOnSection(componentName: ButtonLabelName): void {
    this._tunOnSectionEmiter.next(componentName);
  }

  public get tunOnSectionEmiter(): ReplaySubject<ButtonLabelName> {
    return this._tunOnSectionEmiter;
  }
}
