import { Component, Input } from '@angular/core';
import { WishItem } from './wish-item-model';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.css']
})
export class WishItemComponent {
  @Input()
  wishitem: WishItem | undefined;

}
