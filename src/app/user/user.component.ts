import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  readonly userComponentTitle: string = 'User Section';
  isSpinner: boolean = false;
  isUseretail: boolean = true;
  isNewUser: boolean = false;

  onAddNewUser() {
    this.isNewUser = !this.isNewUser;
  }
}
