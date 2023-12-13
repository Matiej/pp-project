import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { WishitemService } from '../service/wishitem.service';
import { WishItem } from './wish-item/wish-item-model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ alias: '&childInputWhisItemhList', required: true })
  $wishItemList: Observable<WishItem[]> = new Observable<WishItem[]>();
  wishItemList: WishItem[] = [];

  constructor(private wishItemService: WishitemService) {}

  ngOnInit(): void {
    this.wishItemService.fetchAllWishItemsToListComponent();
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

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['$wishItemList'] && changes['$wishItemList'].currentValue) {
    //   this.subscribeWishItemList();
    // }
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
    // if (this._wishItemsSubscription) {
    //   this._wishItemsSubscription.unsubscribe();
    // }
  }

  // private subscribeWishItemList(): void {
  //   this.$wishItemList.pipe(takeUntil(this.destroy$)).subscribe(
  //     (wishItems: WishItem[]) => {
  //       if (wishItems.length > 0) {
  //         this.wishItemList = wishItems;
  //       } else {
  //         this.wishItemList = [];
  //       }
  //       this.wishSharedService.refreshWishCounter(this.wishItemList.length);
  //     },
  //     (error: any) => {
  //       console.error('An error occurred while fetching wishes: ' + error);
  //     }
  //   );
  // }

  // private showToastMessage(message: string, timeout: number): void {
  //   this.toastMessage = message;
  //   this.showToast = true;
  //   setTimeout(() => {
  //     this.showToast = false;
  //     this.toastMessage = '';
  //   }, timeout);
  // }
}
