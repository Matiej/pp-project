import { Component, OnInit } from '@angular/core';
import { ASSETS_PATHS } from '../../constants/assets-paths';
import { WishitemService } from '../service/wishitem.service';

@Component({
  selector: 'app-wish-start',
  templateUrl: './wish-start.component.html',
  styleUrls: ['./wish-start.component.css'],
})
export class WishStartComponent implements OnInit {
  wishStartMessage: string = 'Wish Section starts.';
  readonly startImagePath: string = ASSETS_PATHS.START_IMAGE_FILE_SOURCE;

  constructor(private wishItemService: WishitemService) {}
  ngOnInit(): void {
    this.wishItemService.wishCounterBehaviorSubject.subscribe({
      next: (value: number) => {
        if (value < 1) {
          this.wishStartMessage = "Currently you don't have any wish items!";
        } else {
          this.wishStartMessage = 'Please select a wish item!';
        }
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }
}
