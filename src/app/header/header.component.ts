import { Component, OnInit } from '@angular/core';
import { SharedAuthService } from '../auth/shared-auth.service';
import { EXTERNAL_LINKS } from '../constants/external-links';
import { WishSharedService } from '../shared/wish-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  wishCounter: number = 0;
  gitHubLink: string = EXTERNAL_LINKS.GITHUB_PROJECT_FRONTEND;
  linkedInLink: string = EXTERNAL_LINKS.LINKEDIN_LINK;
  isUserLoggedIn: boolean = false;

  constructor(
    private wishSharedService: WishSharedService,
    private authSharedService: SharedAuthService
  ) {}

  ngOnInit(): void {
    this.wishSharedService.getWishiesCounter().subscribe((wishCounter) => {
      this.wishCounter = wishCounter;
    });

    this.authSharedService.loginNotification.subscribe(
      (isLoggedIn: boolean) => {
        this.logginUserActions(isLoggedIn);
      }
    );
  }

  private logginUserActions(isLoggedIn: boolean) {
    if(isLoggedIn) {
      this.isUserLoggedIn = true;
    }
  }
}
