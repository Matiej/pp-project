import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private _userUpdated: EventEmitter<void> = new EventEmitter();
  private _toastMessageEmiter: EventEmitter<{
    message: string;
    styleClass: string;
    timeout: number;
  }> = new EventEmitter();
  private _spinnerSub = new BehaviorSubject<boolean>(false);
  isSpinning!: boolean ;

  constructor() {}

  public get userUpdated(): EventEmitter<void> {
    return this._userUpdated;
  }

  public updateUserDataNotify(): void {
    this._userUpdated.emit();
  }

  public get toastMessageEmiter(): EventEmitter<{
    message: string;
    styleClass: string;
    timeout: number;
  }> {
    return this._toastMessageEmiter;
  }

  public sendToastMessage(
    message: string,
    styleClass: string,
    timeout: number
  ): void {
    this._toastMessageEmiter.emit({
      message: message,
      styleClass: styleClass,
      timeout,
    });
  }

  get spinnerState(): Observable<boolean> {
    return this._spinnerSub.asObservable();
  }

  checSpinnerState(): Promise<boolean> {
    console.log('checSpinnerState' , this.isSpinning)
    const spinning = new Promise<boolean>((resolve, reject) => {
      resolve(this.isSpinning);
    });
    return spinning;
  }

  public showSpinner(show: boolean) {
    console.log('showSpinner', show);
    this.isSpinning = show;
    this._spinnerSub.next(show);
  }
}
