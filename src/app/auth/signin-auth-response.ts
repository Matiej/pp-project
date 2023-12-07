import { User } from '../user/user-model';
import { AuthResponseData } from './auth-response-data';

export class SignInAuthResponse {
  private _user!: User;
  private _authresponse!: AuthResponseData;

  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  public get authresponse(): AuthResponseData {
    return this._authresponse;
  }
  public set authresponse(value: AuthResponseData) {
    this._authresponse = value;
  }
}
