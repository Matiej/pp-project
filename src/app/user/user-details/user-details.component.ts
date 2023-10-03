import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDatabaseService } from '../service/user-database.service';
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
    private route: ActivatedRoute
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

  onCloseClick() {
    console.log('onCloseClick');
  }

  onRemoveWish() {
    console.log('onRemoveWish');
  }
}
