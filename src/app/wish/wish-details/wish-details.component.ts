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
  wishItem!: WishItem;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private wishSharedService: WishSharedService) {
    console.log('WishdetailContructor');
   }

  ngOnInit(): void {
    this.wishSharedService.wishItemDetailSend
    .pipe(takeUntil(this._destroy$))
    .subscribe((wishItem) => {
      console.log('subscribe fir');
      this.wishItem = wishItem;
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
