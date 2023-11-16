import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
                this.user = user;
                this.sharedAuthService.userLoggedINNotification();
              } else {
                console.error('User is not logged in - wrong password');
                this.isLoginError = true;
              }
            });
          } else {
            console.error('User not found');
            this.isLoginError = true;
          }
        },
        (error: Error) => console.error(error),
        () => this.loginForm.reset()
      );
  }

  getUserStatus(): string {
    return this.isLoggedIn ? 'logged in' : 'not logged in';
  }
}
