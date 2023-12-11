import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { User } from 'src/app/user/user-model';
import { AuthService } from '../auth.service';
import { SignInAuthResponse } from '../signin-auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _singinLoginResposne: SignInAuthResponse = new SignInAuthResponse();
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  isLoginError: boolean = false;
  isSpinning: boolean = false;
  showToast: boolean = false;
  toastMessageClass: string = '';
  userToastMessage: string = '';
  private _authObservale?: Subscription;
  private _isUserLoggin?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    // this.authService.isAuthenticated().then((isAuthenticated:boolean) => {
    //   this.isLoggedIn = isAuthenticated;
    // })

    this._isUserLoggin = this.authService.isUserLoggedIn.subscribe(
      (isUserLoggedIn: boolean) => {
        this.isLoggedIn = isUserLoggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    if (this._authObservale) {
      this._authObservale.unsubscribe();
    }
    if (this._isUserLoggin) {
      this._isUserLoggin.unsubscribe();
    }
  }

  onUserLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.isSpinning = true;
    const formData = this.loginForm.value;

    this._authObservale = this.authService
      .signInFireBaseUser(formData.email, formData.password)
      .subscribe({
        next: (data: SignInAuthResponse) => {
          this.showToastMessage(
            TOAST_MESSAGES.LOGGED_SUCCESSFULLY,
            2500,
            TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
          );
          this._singinLoginResposne = data;

          this.isSpinning = false;
          this.loginForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage: string = 'Unkknown error occurred: ';
          if (error.error) {
            errorMessage = error.error;
          }
          console.warn('Error while logging!: --------', errorMessage);
          this.showToastMessage(
            TOAST_MESSAGES.ERROR_LOGGING + ' ------------ ' + errorMessage,
            4000,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE
          );
          this.isSpinning = false;
          this.loginForm.reset();
        },
      });
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
