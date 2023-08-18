import { Component, Input } from '@angular/core';
import { WishItem } from './wish-item-model';
import { WishType } from './wish-type';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css']
})
export class WishItemComponent {
  @Input()
  wishitem: WishItem | undefined;
  @Input()
  wishNumer: number = 0;
  wishType = WishType;

}
