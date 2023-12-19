import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  exhaustMap,
  map,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthResponseData } from 'src/app/auth/auth-response-data';
import { environment } from 'src/environments/environment';
import { UserDatabaseService } from '../user/service/user-database.service';
import { UserFireBaseAuthData } from '../user/user-auth-data';
import { User } from '../user/user-model';
import { SignInAuthResponse } from './signin-auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  readonly localStorageVariable: string = 'loginData';
  private _isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly fireBaseToken: string = environment.apiToken;
  readonly signUpFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  readonly sginInFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private loginResposne!: SignInAuthResponse | null;
  private _singinLoginResposne: BehaviorSubject<SignInAuthResponse | null> =
    new BehaviorSubject<SignInAuthResponse | null>(null);
  private _findByEmailSubscription?: Subscription;
  private _toeknExpirationTime?: any;

  constructor(
    private http: HttpClient,
    private userDbService: UserDatabaseService
  ) {}

  ngOnDestroy(): void {
    if (this._findByEmailSubscription) {
      this._findByEmailSubscription.unsubscribe();
    }
    if (this._isUserLoggedIn) {
      this._isUserLoggedIn.unsubscribe();
    }
  }

  public signUpFireBaseUser(userToSave: User): Observable<SignInAuthResponse> {
    return this.http
      .post<AuthResponseData>(this.signUpFireBaseUrl + this.fireBaseToken, {
        email: userToSave.email,
        password: userToSave.password,
        returnSecureToken: true,
      })
      .pipe(
        take(1),
        exhaustMap((authResponse: AuthResponseData) => {
          this.loginResposne = new SignInAuthResponse();
          this.loginResposne.userAuthData =
            this.convertToUserFireBaseAuthData(authResponse);
          this._singinLoginResposne.next(this.loginResposne);
          return this.userDbService.saveUserFirebase(userToSave).pipe(
            map((savedUser: User | undefined) => {
              if (savedUser && savedUser !== undefined) {
                this._isUserLoggedIn.next(true);
                return this.handleSuccess(savedUser, authResponse);
              } else {
                throw throwError(
                  () =>
                    new HttpErrorResponse({
                      error: 'User not found',
                      status: 400,
                      statusText: 'Data base user not found',
                    })
                );
              }
            })
          );
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  public logout(): void {
    this._isUserLoggedIn.next(false);
    this.loginResposne = null;
    this._singinLoginResposne.next(null);
    localStorage.removeItem(this.localStorageVariable);
    if (this._toeknExpirationTime) {
      clearTimeout(this._toeknExpirationTime);
    }
    this._toeknExpirationTime = null;
  }

  private autoLogout(expriationDuration: number): void {
    this._toeknExpirationTime = setTimeout(() => {
      this.logout();
    }, expriationDuration);
  }

  public loginFireBaseUser(
    email: string,
    pass: string
  ): Observable<SignInAuthResponse> {
    return this.http
      .post<AuthResponseData>(this.sginInFireBaseUrl + this.fireBaseToken, {
        email: email,
        password: pass,
        returnSecureToken: true,
      })
      .pipe(
        take(1),
        exhaustMap((authResposne: AuthResponseData) => {
          this.handleSuccess(undefined, authResposne);
          this.autoLogout(+authResposne.expiresIn * 1000);
          return this.findUserInDataBase(email).pipe(
            map((user: User) => {
              return this.handleSuccess(user, authResposne);
            })
          );
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  public autoLogin(): void {
    console.log('autologin has been');
    const loginData = localStorage.getItem(this.localStorageVariable);
    if (!loginData) {
      return;
    }
    const loginDataParsed: {
      _idToken: string;
      email: string;
      refreshToken: string;
      expiresIn: string;
      localId: string;
      tokenExpirationDate: string;
    } = JSON.parse(loginData);

    const tokenExpirationDate = new Date(loginDataParsed.tokenExpirationDate);

    const loadedUserAuthData: UserFireBaseAuthData = new UserFireBaseAuthData(
      loginDataParsed._idToken,
      loginDataParsed.email,
      loginDataParsed.refreshToken,
      loginDataParsed.expiresIn,
      loginDataParsed.localId,
      tokenExpirationDate
    );

    if (loadedUserAuthData.idToken) {
      const signInAuthResposne = new SignInAuthResponse();
      signInAuthResposne.userAuthData = loadedUserAuthData;
      this._singinLoginResposne.next(signInAuthResposne);

      this.findUserInDataBase(loadedUserAuthData.email).subscribe((user) => {
        const expirationDuration =
          tokenExpirationDate.getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);

        signInAuthResposne.user = user;
        this._singinLoginResposne.next(signInAuthResposne);
        this.isUserLoggedIn.next(true);
        console.log('autologin woooooooooooooorking');
      });
    }
  }

  private findUserInDataBase(email: string): Observable<User> {
    return this.userDbService.findByEmail(email).pipe(
      switchMap((user: User | undefined) => {
        if (!user) {
          return throwError(() => {
            new HttpErrorResponse({
              error: 'User not found',
              status: 400,
              statusText: 'Data base user not found',
            });
          });
        }
        return of(user);
      })
    );
  }

  private handleSuccess(
    user: User | undefined,
    authResponse: AuthResponseData
  ): SignInAuthResponse {
    this.loginResposne = new SignInAuthResponse();
    if (user) {
      this.loginResposne.user = user;
    }
    this.loginResposne.userAuthData =
      this.convertToUserFireBaseAuthData(authResponse);
    this._singinLoginResposne.next(this.loginResposne);
    localStorage.setItem(
      this.localStorageVariable,
      JSON.stringify(this.loginResposne.userAuthData)
    );

    this.logOffWhenExpiresToken(
      this.loginResposne.userAuthData.tokenExpirationDate
    );
    this._isUserLoggedIn.next(true);
    return this.loginResposne;
  }

  private handleError(errorResposne: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResposne.error || !errorResposne.error.error) {
      return throwError(() => this.prapreError(errorMessage, errorResposne));
    }

    switch (errorResposne.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email address already exists';
        break;
    }
    if (
      errorResposne.error.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')
    ) {
      errorMessage = 'Too many attempts, try again later!';
    }
    this._isUserLoggedIn.next(false);
    return throwError(() => this.prapreError(errorMessage, errorResposne));
  }

  private prapreError(
    errorMessage: string,
    error: HttpErrorResponse
  ): HttpErrorResponse {
    return new HttpErrorResponse({
      error: errorMessage,
      status: error.status,
      statusText: error.statusText,
    });
  }

  private logOffWhenExpiresToken(tokenExpirationDate: Date): void {
    const currentTime = new Date();
    const timeUntilExpiration =
      tokenExpirationDate.getTime() - currentTime.getTime();
    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        this._isUserLoggedIn.next(false);
      }, timeUntilExpiration);
    } else {
      console.warn('Invalid time provided: ' + tokenExpirationDate);

      this._isUserLoggedIn.next(false);
    }
  }

  private convertToUserFireBaseAuthData(
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

  public get singinLoginResposne(): BehaviorSubject<SignInAuthResponse | null> {
    return this._singinLoginResposne;
  }
  public set singinLoginResposne(
    value: BehaviorSubject<SignInAuthResponse | null>
  ) {
    this._singinLoginResposne = value;
  }

  public get isUserLoggedIn(): BehaviorSubject<boolean> {
    return this._isUserLoggedIn;
  }
  public set isUserLoggedIn(value: BehaviorSubject<boolean>) {
    this._isUserLoggedIn = value;
  }
}
