import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  isFetching: boolean = false;

  constructor(
    private userDbService: UserDatabaseService,
    private userSharedService: UserSharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeUsers();
    this.userSharedService.userUpdated.subscribe(() => {
      this.subscribeUsers();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private subscribeUsers(): void {
    this.isFetching = true;
    this.sub = this.userDbService.findAllUsers().subscribe((data) => {
      this.userList = data;
      if (this.userList.length > 0) {
        this.router.navigate([this.userList[0].id], { relativeTo: this.route });
      }
      this.isFetching = false;
    });
  }
}
