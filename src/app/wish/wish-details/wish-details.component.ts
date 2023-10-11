import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private wishSharedService: WishSharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.wishSharedService.wishItemDetailSend
      .pipe(takeUntil(this._destroy$))
      .subscribe((wishItem) => {
        if (wishItem) {
          this.wishItem = wishItem;
        } else {
          this.wishItem = undefined;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  openLargeImage(arg0: any) {}

  onCloseClick() {
    this.wishItem = undefined;
    this.wishSharedService.onCloseWishDetailClick();
  }

  onRemoveWish() {
    if (this.wishItem) {
      this.wishSharedService.removeWishItem(this.wishItem.id);
      this.onCloseClick();
    }
  }

  onEditWish() {
    if (this.wishItem) {
      this.router.navigate(['edit', { id: this.wishItem.id }], {
        relativeTo: this.route,
      });
    
    }
  }
}
