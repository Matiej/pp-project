import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from 'src/app/user/service/user-database.service';
import { UserFireBaseAuthData } from 'src/app/user/user-auth-data';
import { User } from 'src/app/user/user-model';
import { AuthResponseData } from '../auth-response-data';
import { AuthService } from '../auth.service';
import { SharedAuthService } from '../shared-auth.service';
import { SignInAuthResponse } from '../signin-auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _singinLoginResposne!: SignInAuthResponse;
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  isLoginError: boolean = false;
  private loginObservale?: Subscription;
  isSpinning: boolean = false;
  showToast: boolean = false;
  toastMessageClass: string = '';
  userToastMessage: string = '';
  private authObservale?: Subscription;

  constructor(
    private authService: AuthService,
    private userDbService: UserDatabaseService,
    private sharedAuthService: SharedAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    if (this.loginObservale) {
      this.loginObservale.unsubscribe();
    }
    if (this.authObservale) {
      this.authObservale.unsubscribe();
    }
  }

  onUserLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.isSpinning = true;
    const formData = this.loginForm.value;

    this.authObservale = this.authService
      .signInFireBaseUser(formData.email, formData.password)
      .subscribe(
        (data: AuthResponseData) => {
          this._singinLoginResposne.userAuthData =
            this.convertToUserFireBaseAuthData(data);
          this.findUserInDataBase(formData.email, formData.password);
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error.error.message;
          if (errorMessage === 'INVALID_LOGIN_CREDENTIALS') {
            this.isLoginError = true;
          }
          console.warn(error);
          console.log('ERROR========= ', error.error.error.message);
          this.showToastMessage(
            TOAST_MESSAGES.ERROR_LOGGING +
              ' --- Server error: ' +
              error.error.error.message,
            4000,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE
          );
          this.isSpinning = false;

          this.loginForm.reset();
        }
      );
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

  private findUserInDataBase(email: string, pass: string): void {
    this.loginObservale = this.userDbService.findByEmail(email).subscribe(
      (user: User | undefined) => {
        if (user) {
          this.authService.userLogin(pass, user);
          this.authService.isAuthenticated().then((auth: boolean) => {
            this.isLoggedIn = auth;
            if (this.isLoggedIn) {
              this.showToastMessage(
                TOAST_MESSAGES.LOGGED_SUCCESSFULLY,
                2500,
                TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
              );
              this._singinLoginResposne.user = user;
              this.sharedAuthService.userLoggedINNotification();
              this.isSpinning = false;
              this.loginForm.reset();
            } else {
              this.showToastMessage(
                TOAST_MESSAGES.WRONG_USERNAME_OR_PASS,
                2500,
                TOAST_MESSAGES.DANGER_MESSAGE_STYLE
              );
              this.loginForm.reset();
              this.isSpinning = false;
              console.error('User is not logged in - wrong password');
              this.isLoginError = true;
            }
          });
        } else {
          this.showToastMessage(
            TOAST_MESSAGES.WRONG_USERNAME_OR_PASS,
            2500,
            TOAST_MESSAGES.DANGER_MESSAGE_STYLE
          );
          this.loginForm.reset();
          this.isSpinning = false;
          console.error('User not found');
          this.isLoginError = true;
        }
      },
      (error: HttpErrorResponse) => {
        this.showToastMessage(
          TOAST_MESSAGES.ERROR_LOGGING +
            ' --- Server error: ' +
            error.error.error.message,
          4000,
          TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE
        );
        this.isSpinning = false;
        console.error(error);
        this.loginForm.reset();
      }
    );
  }

  get user(): User | undefined {
    if (this._singinLoginResposne) {
      return this._singinLoginResposne.user;
    }
    return undefined;
  }

  getUserStatus(): string {
    return this.isLoggedIn ? 'logged in' : 'not logged in';
  }

  private showToastMessage(
    message: string,
    timeout: number,
    messageStyle: string
  ): void {
    this.userToastMessage = message;
    this.showToast = true;
    this.toastMessageClass = messageStyle;
    setTimeout(() => {
      this.showToast = false;
      this.userToastMessage = '';
      this.toastMessageClass = '';
    }, timeout);
  }
}
