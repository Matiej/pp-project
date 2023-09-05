import { Component, OnInit } from '@angular/core';
import { WishSharedService } from '../shared/wish-shared.service';
import { EXTERNAL_LINKS } from '../constants/external-links';

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

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.wishSharedService.getWishiesCounter().subscribe((wishCounter) => {
      this.wishCounter = wishCounter; 
    });
  }
}
