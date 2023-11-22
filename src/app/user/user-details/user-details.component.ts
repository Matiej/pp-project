import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css', '../user.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user?: User;
  paramSubscription?: Subscription;
  userSubscription?: Subscription;

  constructor(
    private userDatabaseService: UserDatabaseService,
    private route: ActivatedRoute,
    private userSharedService: UserSharedService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  onRemoveUser() {
    this.userSharedService.spinnerEmitter.emit(true);
    this.userDatabaseService.removeById(this.user!.id).subscribe(
      (isRemoved: boolean) => {
        if (isRemoved) {
          this.userSharedService.updateUserDataNotify();
          this.userSharedService.spinnerEmitter.emit(false);
          this.userSharedService.sendToastMessage(
            TOAST_MESSAGES.USER_REMOVED_SUCCESSFULLY,
            TOAST_MESSAGES.DANGER_MESSAGE_STYLE,
            3000
          );
        } else {
          this.userSharedService.spinnerEmitter.emit(false);
          this.userSharedService.sendToastMessage(
            TOAST_MESSAGES.ERROR_USER_REMOVING,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
            4000
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.userSharedService.spinnerEmitter.emit(false);
        this.userSharedService.sendToastMessage(
          TOAST_MESSAGES.ERROR_USER_REMOVING + '---' + error.error.error,
          TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
          4000
        );
      }
    );
  }
}
