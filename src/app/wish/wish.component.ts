import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishSharedService } from '../shared/wish-shared.service';
import { ButtonDetails } from './wish-edit/wish-edit.component';
import { WishItem } from './wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css'],
})
export class WishComponent implements OnInit {
  readonly wishComponentTitle: string = 'Your wishies and findings sector';
  wishEditBottomsForChild$: Observable<ButtonDetails[]> = new Observable<
    ButtonDetails[]
  >();
  $wishItemParentList: Observable<WishItem[]> = new Observable<WishItem[]>();
  isSpinner: boolean = false;
  isWishDetail: boolean = false;
  // isNewWish: boolean = false;

  private _changeStateWishItemNotifier: EventEmitter<void> = new EventEmitter();
  private _isWishDetail: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private wishSharedService: WishSharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this._changeStateWishItemNotifier =
      this.wishSharedService.changeStateWishItemNotifier;
    this._changeStateWishItemNotifier.subscribe(() => {
      this.$wishItemParentList = this.wishSharedService.getWishList();
    });

    this._isWishDetail = this.wishSharedService.isWishDetail;
    this._isWishDetail.subscribe((value: boolean) => {
      this.isWishDetail = value;
    });
    this.$wishItemParentList = this.wishSharedService.getWishList();
  }

  onAddNewWish() {
    // this.isNewWish = !this.isNewWish;
    // this.wishEditBottomsForChild$ = of(this.getNewWishItemButtons());
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  // private getNewWishItemButtons(): ButtonDetails[] {
  //   const add = new ButtonDetails(
  //     'ADD',
  //     'btn btn-primary',
  //     WISH_EDIT_BUTTON_METHODS.ADD_NEW_WISH_ITEM
  //   );
  //   const clean = new ButtonDetails(
  //     'CLEAN',
  //     'btn btn-warning',
  //     WISH_EDIT_BUTTON_METHODS.CLEAN_WISH_ITEM_FIELDS
  //   );

  //   return [add, clean];
  // }
}
