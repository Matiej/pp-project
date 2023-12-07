import { AuthResponseData } from '../auth/auth-response-data';

export class UserFireBaseAuthData {
  private _idToken: string | undefined;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  tokenExpirationDate!: Date;

  constructor(
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    tokenExpirationDate: Date
  ) {
    this._idToken = idToken;
    this.email = email;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.localId = localId;
    this.tokenExpirationDate = tokenExpirationDate;
  }

  public get idToken(): string | undefined {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return undefined;
    }
    return this._idToken;
  }

  public convertToUserFireBaseAuthData(
    reposneAuthData: AuthResponseData
  ): UserFireBaseAuthData {
    const expirationDate = new Date(
      new Date().getTime() + +reposneAuthData.expiresIn * 1000
    );
    let userFireBaseAuthData: UserFireBaseAuthData = new UserFireBaseAuthData(
      reposneAuthData.idToken,
      reposneAuthData.email,
      reposneAuthData.refreshToken,
      reposneAuthData.expiresIn,
      reposneAuthData.localId,
      expirationDate
    );
    return userFireBaseAuthData;
  }
}
