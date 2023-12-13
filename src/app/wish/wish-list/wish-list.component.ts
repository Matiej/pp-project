import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WishitemService } from '../service/wishitem.service';
import { WishItem } from './wish-item/wish-item-model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnDestroy {
  wishItemList: WishItem[] = [];
  constructor(private wishItemService: WishitemService) {}
  private _wishSubscription!: Subscription;

  ngOnInit(): void {
    this.wishItemService.fetchAllWishItemsToListComponent();
    this._wishSubscription =
      this.wishItemService.wishItemsBehaviorSubject.subscribe({
        next: (wishItems: WishItem[]) => {
          this.wishItemList = wishItems;
        },
        error: (errorResposne: any) => {
          console.warn(
            'Error occurred while fetchin wishItem list ------ ,',
            errorResposne
          );
        },
      });
  }

  ngOnDestroy(): void {
    if (this._wishSubscription) {
      this._wishSubscription.unsubscribe();
    }
  }
}
