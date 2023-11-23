import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private _toastEmiterSubscription!: Subscription;
  private _spinSubscription!: Subscription;

  constructor(private userSharedService: UserSharedService) {}

  ngOnInit(): void {
    this.userSharedService.spinnerState.subscribe((spinnerState: boolean) => {
      console.log('old state: ', this.isSpinner);
      this.isSpinner = spinnerState;
      console.log('new state: ', spinnerState);
    });
    this._toastEmiterSubscription =
      this.userSharedService.toastMessageEmiter.subscribe(
        (toast: { message: string; styleClass: string; timeout: number }) => {
          this.showToastMessage(toast.message, toast.timeout, toast.styleClass);
        }
      );
  }

  ngOnDestroy(): void {
    if (this._toastEmiterSubscription) {
      this._toastEmiterSubscription.unsubscribe();
    }

    if (this._spinSubscription) {
      this._spinSubscription.unsubscribe();
    }
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
