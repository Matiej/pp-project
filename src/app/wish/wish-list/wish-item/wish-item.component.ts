import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onDetailsClick(wishItem: WishItem): void {
    this.router.navigate([wishItem.id], { relativeTo: this.route });
  }
}
