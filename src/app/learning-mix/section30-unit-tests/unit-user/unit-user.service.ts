import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnitUserService {
  private _user: { name: string; age: number } = {
    name: 'userfromService',
    age: 123,
  };

  constructor() {}

  public get user(): { name: string; age: number } {
    return this._user;
  }
  public set user(value: { name: string; age: number }) {
    this._user = value;
  }
}
