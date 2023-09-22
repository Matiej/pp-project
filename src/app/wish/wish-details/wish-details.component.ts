import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css', '../wish.component.css'],
})
export class WishDetailsComponent implements OnInit, OnDestroy {
  wishItem: WishItem | undefined;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.wishSharedService.wishItemDetailSend
      .pipe(takeUntil(this._destroy$))
      .subscribe((wishItem) => {
        if (wishItem) {
          console.log('subscirbe wishItemDetailSend wishIs present')
          this.wishItem = wishItem;
        } else {
          console.log('subscirbe wishItemDetailSend undefined')
          this.wishItem = undefined;
        }
      });
    // this.wishSharedService.wishItenDetailRemove
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe((wishId: number) => {
    //     if (this.wishItem && this.wishItem.id === wishId) {
    //       this.onCloseClick();
    //     }
    //   });
  }

  openLargeImage(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onCloseClick() {
    this.wishItem = undefined;
    this.wishSharedService.onCloseWishDetailClick();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onRemoveWish() {
    if (this.wishItem) {
      this.wishSharedService.removeWishItem(this.wishItem.id);
      this.onCloseClick();
    }
  }
}
