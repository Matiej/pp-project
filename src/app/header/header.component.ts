import { Component, OnInit } from '@angular/core';
import { WishSharedService } from '../shared/wish-shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  wishCounter: number = 0;

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.wishSharedService.getWishiesCounter().subscribe((wishCounter) => {
      this.wishCounter = wishCounter; 
    });
  }
}
