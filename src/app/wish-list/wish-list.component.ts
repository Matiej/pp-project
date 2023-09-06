import { Component, OnInit } from '@angular/core';
import { WishItem } from './wish-item/wish-item-model';
import { PictureSizeUrl } from '../shared/picture.size';
import { WishSharedService } from '../shared/wish-shared.service';
import { WishType } from './wish-item/wish-type';
import { TOAST_MESSAGES } from '../constants/toast-messages';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  wishItems: WishItem[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.wishSharedService.getWishList().subscribe((wishList: WishItem[]) => {
      console.log(wishList);
      if (wishList && wishList.length > 0) {
        this.wishItems.push(...wishList);
        this.wishItems.reverse();
      }
    });

    this.wishSharedService.refreshWishCounter(this.wishItems.length);
  }

  public onRemoveWish(index: number): void {
    if (index >= 0 && index < this.wishItems.length) {
      this.wishItems.splice(index, 1);
      this.wishSharedService.refreshWishCounter(this.wishItems.length);
      this.showToastMessage(TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY, 3000);
    }
  }

  private showToastMessage(message: string, timeout: number) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, timeout);
  }
}
