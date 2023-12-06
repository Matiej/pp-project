import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { UserDatabaseService } from '../service/user-database.service';
import { UserSharedService } from '../service/user-shared.service';
import { User } from '../user-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  userList: User[] = [];

  constructor(
    private userDbService: UserDatabaseService,
    private userSharedService: UserSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeUsers();

    this.sub = this.userSharedService.userUpdated.subscribe(() => {
      this.subscribeUsers();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private subscribeUsers(): void {
    this.sub = this.userDbService.findAllUsers().subscribe(
      (data) => {
        this.userList = data;
        if (this.userList.length > 0) {
          this.router.navigate([this.userList[0].id], {
            relativeTo: this.route,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.userSharedService.sendToastMessage(
          TOAST_MESSAGES.ERROR_USER_FETCHING +
            '--- Server error: ' +
            error.error.error,
          TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
          4000
        );
      }
    );
  }
}
