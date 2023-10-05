import { Component } from '@angular/core';
import { UserDatabaseService } from 'src/app/user/service/user-database.service';
import { User } from 'src/app/user/user-model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  user?: User;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private userDbService: UserDatabaseService
  ) {}

  onLogin() {
    this.authService.login();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.userDbService.findById(1).subscribe((user?: User) => {
      this.user = user;
    });
  }

  getUserStatus(): string {
    return this.isLoggedIn? 'logged in' : 'not logged in';
    }
}
