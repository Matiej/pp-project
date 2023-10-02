import { EventEmitter, Injectable } from '@angular/core';
import { UserDatabaseService } from './user-database.service';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private _userUpdated: EventEmitter<void> = new EventEmitter();

  constructor(private userDatabaseService: UserDatabaseService) {}

  public get userUpdated(): EventEmitter<void> {
    return this._userUpdated;
  }
  public set userUpdated(value: EventEmitter<void>) {
    this._userUpdated = value;
  }

  public updateUserDataNotify(): void {
    this._userUpdated.emit();
  }
}
