import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit , OnDestroy{
  sub!: Subscription;
  userList: User[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private userDbService: UserDatabaseService) {}

  ngOnInit(): void {
    this.sub = this.userDbService.findAll().subscribe((data) => {
      this.userList = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
