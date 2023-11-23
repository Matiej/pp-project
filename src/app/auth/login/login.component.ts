import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from 'src/app/user/service/user-database.service';
import { User } from 'src/app/user/user-model';
import { AuthService } from '../auth.service';
import { SharedAuthService } from '../shared-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user?: User;
  isLoggedIn: boolean = false;
  loginForm!: FormGroup;
  isLoginError: boolean = false;
  private loginObservale?: Subscription;
  isSpinning: boolean = false;
  showToast: boolean = false;
  toastMessageClass: string = '';
  userToastMessage: string = '';

  constructor(
    private authService: AuthService,
    private userDbService: UserDatabaseService,
    private sharedAuthService: SharedAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy(): void {
    if (this.loginObservale) {
      this.loginObservale.unsubscribe();
    }
  }

  onUserLogin(): void {
    this.isSpinning = true;
    const formData = this.loginForm.value;
    this.loginObservale = this.userDbService
      .findByEmail(formData.email)
      .subscribe(
        (user: User | undefined) => {
          if (user) {
            this.authService.userLogin(formData.password, user);
            this.authService.isAuthenticated().then((auth: boolean) => {
              this.isLoggedIn = auth;
              if (this.isLoggedIn) {
                this.showToastMessage(
                  TOAST_MESSAGES.LOGGED_SUCCESSFULLY,
                  2500,
                  TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE
                );
                this.user = user;
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
            TOAST_MESSAGES.ERROR_LOGGING + ' --- Server error: ' + error.error.error,
            4000,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE
          );
          this.isSpinning = false;
          console.error(error);
          this.loginForm.reset();
        }
      );
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
