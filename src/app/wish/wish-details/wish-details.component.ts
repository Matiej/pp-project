import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
      this.wishItemService.removeWishItem(this.wishItem.id);
      this.onCloseClick();
    }
  }

  onEditWish() {
    if (this.wishItem) {
      this.router.navigate(['/wish', this.wishItem.id, 'edit']);
    }
  }
}
