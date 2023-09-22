import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css'],
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
          this.wishItem = wishItem;
        } else {
          this.onCloseClick();
          this.wishItem = undefined;
        }
      });
      this.wishSharedService.wishItenDetailRemove
      .pipe(takeUntil(this._destroy$))
      .subscribe((wishId: number) => {
        if(this.wishItem && this.wishItem.id === wishId) {
          this.onCloseClick();
        }
      })
  }

  openLargeImage(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onCloseClick() {
    this.wishSharedService.onCloseWishDetailClick();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
