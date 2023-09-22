import { Component, Input } from '@angular/core';
import { WishSharedService } from '../../../shared/wish-shared.service';
import { WishItem } from './wish-item-model';
import { WishType } from './wish-type';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css'],
})
export class WishItemComponent {
  @Input()
  wishitem?: WishItem;
  @Input()
  wishNumer: number = 0;
  wishType = WishType;

  constructor(private wishSharedService: WishSharedService) {}

  public onDetailsClick(wishItem: WishItem): void {
    this.wishSharedService.onWishDetailsClick(wishItem);
  }
}
