import { EventEmitter, Injectable } from '@angular/core';
import { UserDatabaseService } from './user-database.service';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private _userUpdated: EventEmitter<void> = new EventEmitter();
  private _toastMessageEmiter: EventEmitter<{
    message: string;
    styleClass: string;
  }> = new EventEmitter();

  constructor(private userDatabaseService: UserDatabaseService) {}

  public get userUpdated(): EventEmitter<void> {
    return this._userUpdated;
  }

  public updateUserDataNotify(): void {
    this._userUpdated.emit();
  }

  public get toastMessageEmiter(): EventEmitter<{
    message: string;
    styleClass: string;
  }> {
    return this._toastMessageEmiter;
  }

  public sendToastMessage(message: string, styleClass: string): void {
    this._toastMessageEmiter.emit({ message: message, styleClass: styleClass });
  }
}
