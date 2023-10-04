import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UserSharedService } from './service/user-shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  readonly userComponentTitle: string = 'User Section';
  isSpinner: boolean = false;
  userToastMessage: string = '';
  showToast: boolean = false;
  toastMessageClass: string = 'success-toast';
  private _toastEmiter: EventEmitter<any> = new EventEmitter();

  constructor(private userSharedService: UserSharedService) {}

  ngOnInit(): void {
    this._toastEmiter = this.userSharedService.toastMessageEmiter;
    this._toastEmiter.subscribe(
      (toast: { message: string; styleClass: string }) => {
        this.showToastMessage(toast.message, 3000, toast.styleClass);
      }
    );
  }

  ngOnDestroy(): void {
    this._toastEmiter.unsubscribe();
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
