import { Component, OnInit } from '@angular/core';
import { WishSharedService } from '../shared/wish-shared.service';
import { Observable } from 'rxjs';
import { WishItem } from './wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css'],
})
export class WishComponent implements OnInit {
  $wishItemParentList: Observable<WishItem[]> = new Observable<WishItem[]>();

  isSpinner: boolean = false;
  isWishDetail: boolean = false;
  isNewWish: boolean = false;

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.$wishItemParentList = this.wishSharedService.getWishList();
  }
}
