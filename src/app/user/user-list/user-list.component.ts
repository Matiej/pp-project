import { Component, OnInit } from '@angular/core';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private userSharedService: UserSharedService) {}

  ngOnInit(): void {
    this.userList = this.userSharedService.getDefaultUser();
  }

  public onRemoveUser(user: User): void {
    this.showToastMessage(TOAST_MESSAGES.USER_REMOVED_SUCCESSFULLY, 3000);
  }

  private showToastMessage(message: string, timeout: number): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = '';
    }, timeout);
  }
}
