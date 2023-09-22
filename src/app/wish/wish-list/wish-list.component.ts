import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
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
  private destroy$ = new Subject<void>();
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['$wishItemList'] && changes['$wishItemList'].currentValue) {
      this.subscribeWishItemList();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRemoveWithItem(wishItem: WishItem): void {
    this.wishSharedService.removeWishItem(wishItem.id);
    this.$wishItemList = this.wishSharedService.getWishList();
    this.subscribeWishItemList();
    this.showToastMessage(TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY, 3000);
  }

  private subscribeWishItemList(): void {
    this.$wishItemList.pipe(takeUntil(this.destroy$)).subscribe(
      (wishItems: WishItem[]) => {
        if (wishItems.length > 0) {
          this.wishItemList = wishItems;
          console.log(
            'refreshing wish list and sharedService onwishdetailsClisk call'
          );
          this.wishSharedService.onWishDetailsClick(this.wishItemList[0]);
        } else {
          this.wishItemList = [];
        }
        this.wishSharedService.refreshWishCounter(this.wishItemList.length);
      },
      (error: any) => {
        console.error('An error occurred while fetching wishes: ' + error);
      }
    );
  }

  private showToastMessage(message: string, timeout: number): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMessage = '';
    }, timeout);
  }
}
