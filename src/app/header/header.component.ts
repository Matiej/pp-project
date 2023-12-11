import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { EXTERNAL_LINKS } from '../constants/external-links';
import { WishSharedService } from '../shared/wish-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  wishCounter: number = 0;
  gitHubLink: string = EXTERNAL_LINKS.GITHUB_PROJECT_FRONTEND;
  linkedInLink: string = EXTERNAL_LINKS.LINKEDIN_LINK;
  isUserLoggedIn: boolean = false;
  private _isUserLoggedIn?: Subscription;

  constructor(
    private wishSharedService: WishSharedService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.wishSharedService.getWishiesCounter().subscribe((wishCounter) => {
      this.wishCounter = wishCounter;
    });

    this._isUserLoggedIn = this.authService.isUserLoggedIn.subscribe(
      (isAuthenticated: boolean) => {
        this.logginUserActions(isAuthenticated);
      }
    );
  }

  ngOnDestroy(): void {
    if (this._isUserLoggedIn) {
      this._isUserLoggedIn.unsubscribe();
    }
  }

  private logginUserActions(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    //later do other stuff
  }
}
