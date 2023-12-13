import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { WishitemService } from '../service/wishitem.service';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css', '../wish.component.css'],
})
export class WishDetailsComponent implements OnInit, OnDestroy {
  wishItem: WishItem | undefined;
  private _destroy$: Subject<void> = new Subject<void>();
  private _wishItemServiceSubscription!: Subscription;

  constructor(
    private wishItemService: WishitemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: Params) => {
        const wishItemID: string = params['id'];
        if (wishItemID) {
          this.wishItemService.findWishByid(wishItemID).subscribe({
            next: (wishItem: WishItem | undefined) => {
              if (wishItem) {
                this.wishItem = wishItem;
              } else {
                // do sometnigh maybe toast message here
              }
            },
            error: (err: HttpErrorResponse) => {
              console.warn(
                'Error occured while fetching wishItem details--- ',
                err
              );
            },
          });
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    if (this._wishItemServiceSubscription) {
      this._wishItemServiceSubscription.unsubscribe();
    }
  }

  openLargeImage(arg0: any) {}

  onCloseClick() {
    this.wishItem = undefined;
    this.router.navigate(['wish']);
  }

  onRemoveWish() {
    if (this.wishItem) {
      this.wishItemService.removeWishItem(this.wishItem.id).subscribe({
        next: (isRemoved) => {
          if (isRemoved) {
            this.wishItemService.emitWishToastMessage(
              TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY,
              TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
              3000
            );
          } else {
            this.wishItemService.emitWishToastMessage(
              TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY,
              TOAST_MESSAGES.DANGER_MESSAGE_STYLE,
              3000
            );
          }
          this.wishItemService.fetchAllWishItemsToListComponent();
          this.onCloseClick();
        },
        error: (errorRes) => {
          let errorMessage = 'An uknown error occurred';
          if (errorRes.error) {
            errorMessage = errorRes.error;
          }
          this.wishItemService.emitWishToastMessage(
            TOAST_MESSAGES.WISH_ADDING_ERROR + ' ------------ ' + errorMessage,
            TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
            4000
          );
          console.warn(errorRes);
        },
      });
      this.onCloseClick();
    }
  }

  onEditWish() {
    if (this.wishItem) {
      this.router.navigate(['/wish', this.wishItem.id, 'edit']);
    }
  }
}
