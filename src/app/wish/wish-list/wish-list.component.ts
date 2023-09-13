import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WishItem } from './wish-item/wish-item-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit, OnChanges {
  @Input({ alias: '&childInputWhisItemhList', required: true })
  $wishItemList: Observable<WishItem[]> = new Observable<WishItem[]>();
  wishItemList: WishItem[] = [];
 
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['$wishItemList'] && changes['$wishItemList'].currentValue) {
      this.subscribeWishItemList();
    }
  }

  private subscribeWishItemList(): void {
    this.$wishItemList.subscribe(
      (wishItem: WishItem[]) => {
        if (wishItem.length > 0) {
          this.wishItemList.push(...wishItem);
          this.wishSharedService.refreshWishCounter(this.wishItemList.length);
          // this.onDetailsClick(this.wishItemList[0]) <- add deafult  first item detail show
        }
      },
      (error: any) => {
        console.error('An error occurred while fetching wishes: ' + error);
      }
    );
  }

  public onRemoveWish(index: number): void {
    if (index >= 0 && index < this.wishItemList.length) {
      this.wishItemList.splice(index, 1);
      this.wishSharedService.refreshWishCounter(this.wishItemList.length);
      this.showToastMessage(TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY, 3000);
    }
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
