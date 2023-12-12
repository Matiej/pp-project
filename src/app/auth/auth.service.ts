import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
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
  private _isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly fireBaseToken: string = environment.apiToken;
  readonly signUpFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  readonly sginInFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  private _singinLoginResposne: Subject<SignInAuthResponse> = new Subject();
  private _findByEmailSubscription?: Subscription;

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
    if (this._singinLoginResposne) {
      this._singinLoginResposne.unsubscribe();
    }
  }

  signUpFireBaseUser(userToSave: User): Observable<SignInAuthResponse> {
    return this.http
      .post<AuthResponseData>(this.signUpFireBaseUrl + this.fireBaseToken, {
        email: userToSave.email,
        password: userToSave.password,
        returnSecureToken: true,
      })
      .pipe(take(1),
        exhaustMap((authResponse: AuthResponseData) => {
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

  signInFireBaseUser(
    email: string,
    pass: string
  ): Observable<SignInAuthResponse> {
    return this.http
      .post<AuthResponseData>(this.sginInFireBaseUrl + this.fireBaseToken, {
        email: email,
        password: pass,
        returnSecureToken: true,
      })
      .pipe(take(1),
        exhaustMap((authResposne: AuthResponseData) => {
          return this.findUserInDataBase(email).pipe(
            map((user: User) => {
              console.log('looking for user;');

              return this.handleSuccess(user, authResposne);
            })
          );
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  private findUserInDataBase(email: string): Observable<User> {
    return this.userDbService.findByEmail(email).pipe(
      switchMap((user: User | undefined) => {
        if (!user) {
          return throwError(
            new HttpErrorResponse({
              error: 'User not found',
              status: 400,
              statusText: 'Data base user not found',
            })
          );
        }
        return of(user);
      })
    );
  }

  private handleSuccess(
    user: User,
    authResponse: AuthResponseData
  ): SignInAuthResponse {
    let signInAuthResposne: SignInAuthResponse = new SignInAuthResponse();
    signInAuthResposne.user = user;
    signInAuthResposne.userAuthData =
      this.convertToUserFireBaseAuthData(authResponse);
    this._singinLoginResposne.next(signInAuthResposne);
    this.logOffWhenExpiiesToken(
      signInAuthResposne.userAuthData.tokenExpirationDate
    );
    this._isUserLoggedIn.next(true);
    return signInAuthResposne;
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

  logout(): void {
    this._isUserLoggedIn.next(false);
  }

  private logOffWhenExpiiesToken(tokenExpirationDate: Date): void {
    const currentTime = new Date();
    const timeUntilExpiration =
      tokenExpirationDate.getTime() - currentTime.getTime();
    console.log('tieeeeemeeeeeeeeee:  ', timeUntilExpiration);
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

  public get singinLoginResposne(): Subject<SignInAuthResponse> {
    return this._singinLoginResposne;
  }
  public set singinLoginResposne(value: Subject<SignInAuthResponse>) {
    this._singinLoginResposne = value;
  }

  public get isUserLoggedIn(): BehaviorSubject<boolean> {
    return this._isUserLoggedIn;
  }
  public set isUserLoggedIn(value: BehaviorSubject<boolean>) {
    this._isUserLoggedIn = value;
  }
}
