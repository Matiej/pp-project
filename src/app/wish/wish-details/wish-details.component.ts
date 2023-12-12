import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WishDatabaseService } from '../service/wish-database.service';
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
    private wishDatabaseService: WishDatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: Params) => {
        const wishItemID: string = params['id'];
        if (wishItemID && !Number.isNaN(wishItemID)) {
          this.wishDatabaseService
            .findWishByid( wishItemID)
            .subscribe((data) => {
              this.wishItem = data;
            });
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
    this.router.navigate(['wish']);
 
  }

  onRemoveWish() {
    if (this.wishItem) {
      this.wishSharedService.removeWishItem(this.wishItem.id);
      this.onCloseClick();
    }
  }

  onEditWish() {
    if (this.wishItem) {
      this.router.navigate(['/wish', this.wishItem.id, 'edit']);
    }
  }
}
