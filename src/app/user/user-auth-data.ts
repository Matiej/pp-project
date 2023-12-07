export class UserFireBaseAuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;

  constructor(
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
  ) {
    this.idToken = idToken;
    this.email = email;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.localId = localId;
  }

}
