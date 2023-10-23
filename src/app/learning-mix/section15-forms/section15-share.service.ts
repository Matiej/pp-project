import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserFormModel } from './user.form.model';

@Injectable({
  providedIn: 'root',
})
export class Section15ShareService {
  private _userFormSender: Subject<UserFormModel> = new Subject();
  private _isUserCompontent: Subject<boolean> = new Subject();

  constructor() {}

  public sendUserFormToView(userForm: NgForm) {
    this._userFormSender.next(this.convertFormToUser(userForm));
  }

  private convertFormToUser(userForm: NgForm): UserFormModel {
    const form = userForm.value;
    return {
      username: form.username,
      lastname: form.lastname,
      email: form.email,
      question: form.secret,
    };
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
