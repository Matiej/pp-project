import { UserFireBaseAuthData } from '../user/user-auth-data';
import { User } from '../user/user-model';

export class SignInAuthResponse {
  private _user!: User;
  private _userAuthData!: UserFireBaseAuthData;

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public get userAuthData(): UserFireBaseAuthData {
    return this._userAuthData;
  }
  public set userAuthData(value: UserFireBaseAuthData) {
    this._userAuthData = value;
  }
}
