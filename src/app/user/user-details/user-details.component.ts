import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      const userId: string = params['id'];
      if (userId && !Number.isNaN(userId)) {
        this.userDatabaseService
          .findById(Number.parseFloat(userId))
          .subscribe((data) => {
            this.user = data;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  onRemoveUser() {
    if (this.userDatabaseService.removeById(this.user!.id)) {
      this.userSharedService.updateUserDataNotify();
      this.userSharedService.sendToastMessage(
        TOAST_MESSAGES.USER_REMOVED_SUCCESSFULLY,
        TOAST_MESSAGES.REMOVE_MESSAGE_STYLE
      );
    }
  }
}
