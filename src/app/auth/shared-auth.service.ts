import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedAuthService {
  private _loginNotification: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public get loginNotification(): EventEmitter<boolean> {
    return this._loginNotification;
  }

  public userLoggedINNotification(): void {
    this._loginNotification.emit(true)
 
  }

  public userLoggedOUTotification(): void {
    this._loginNotification.emit(false)
 
  }
}
