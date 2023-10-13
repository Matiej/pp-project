import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomShareService {
  private _activeSubjEmiter: Subject<boolean> = new Subject();

  constructor() {}

  public changeSubjectActiavtionState(isActivated: boolean): void {
    this._activeSubjEmiter.next(isActivated);
  }

  public get activeSubjEmiter(): Subject<boolean> {
    return this._activeSubjEmiter;
  }
}
