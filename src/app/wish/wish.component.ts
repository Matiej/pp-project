import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WishSharedService } from '../shared/wish-shared.service';
import { WISH_EDIT_BUTTON_METHODS } from './wish-edit-button-methods-const';
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
  isNewWish: boolean = false;

  constructor(private wishSharedService: WishSharedService) {
    this.wishSharedService.newWishItemNotifyEmiter.subscribe(() => {
      this.$wishItemParentList = this.wishSharedService.getWishList();
    });

    wishSharedService.isWishDetail.subscribe((value: boolean) => {
      console.log(value);
      this.isWishDetail = value;
    });
  }

  ngOnInit(): void {
    this.$wishItemParentList = this.wishSharedService.getWishList();
  }

  onAddNewWish() {
    this.isNewWish = !this.isNewWish;
    this.wishEditBottomsForChild$ = of(this.getNewWishItemButtons());
  }

  private getNewWishItemButtons(): ButtonDetails[] {
    const add = new ButtonDetails(
      'ADD',
      'btn btn-primary',
      WISH_EDIT_BUTTON_METHODS.ADD_NEW_WISH_ITEM
    );
    const clean = new ButtonDetails(
      'CLEAN',
      'btn btn-warning',
      WISH_EDIT_BUTTON_METHODS.CLEAN_WISH_ITEM_FIELDS
    );

    return [add, clean];
  }
}
