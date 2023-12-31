import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/direcives/placeholder/placeholder.directive';
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
  // isLoginError: boolean = false;
  errorMessage: string = 'User email or password is wrong!';
  isSpinning: boolean = false;
  showToast: boolean = false;
  toastMessageClass: string = '';
  userToastMessage: string = '';
  private _authObservale?: Subscription;
  private _isUserLoggin?: Subscription;

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  private _closeAlertWindowSub!: Subscription;

  constructor(
    private authService: AuthService,
    private componentFacotryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

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
    if (this._closeAlertWindowSub) {
      this._closeAlertWindowSub.unsubscribe();
    }
  }

  // onCloseAlert() {
  //   this.isLoginError = false;
  // }

  onUserLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.isSpinning = true;
    const formData = this.loginForm.value;

    this._authObservale = this.authService
      .loginFireBaseUser(formData.email, formData.password)
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
          // this.errorMessage = errorMessage;
          this.showErrorAlert(errorMessage);

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

  private showErrorAlert(errorMessage: string): void {
    // this.isLoginError = true;
    const alertComponentFactory: ComponentFactory<AlertComponent> =
      this.componentFacotryResolver.resolveComponentFactory(AlertComponent);
    console.log('show error : ', this.alertHost);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // is better to clear before create something new

    let createdComponentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    createdComponentRef.instance.alertMessage = errorMessage;
    this._closeAlertWindowSub =
      createdComponentRef.instance.closeAlertEmiter.subscribe(() => {
        this._closeAlertWindowSub.unsubscribe();
        hostViewContainerRef.clear();
      });
  }
}
