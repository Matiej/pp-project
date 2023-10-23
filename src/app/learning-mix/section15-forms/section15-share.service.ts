import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserFormModel } from './user.form.model';

@Injectable({
  providedIn: 'root',
})
export class Section15ShareService {
  private _userFormSender: Subject<UserFormModel> = new Subject();
  private _isUserCompontent: Subject<boolean> = new Subject();

  constructor() {}

  public sendUserFormToView(userFormModel: UserFormModel) {
    this._userFormSender.next(userFormModel);

    if (userFormModel) {
      this._isUserCompontent.next(true);
    }
  }

  public get userFormSender(): Subject<UserFormModel> {
    return this._userFormSender;
  }

  public get isUserCompontent(): Subject<boolean> {
    return this._isUserCompontent;
  }
  public set isUserCompontent(value: Subject<boolean>) {
    this._isUserCompontent = value;
  }
}
