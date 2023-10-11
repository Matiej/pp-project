import { Component, OnInit } from '@angular/core';
import { ASSETS_PATHS } from '../../constants/assets-paths';
import { WishDatabaseService } from '../service/wish-database.service';

@Component({
  selector: 'app-wish-start',
  templateUrl: './wish-start.component.html',
  styleUrls: ['./wish-start.component.css'],
})
export class WishStartComponent implements OnInit {
  wishStartMessage: string = 'Wish Section starts.';
  readonly startImagePath: string =  ASSETS_PATHS.START_IMAGE_FILE_SOURCE;

  constructor(private wishDBservice: WishDatabaseService) {}
  ngOnInit(): void {
    if (this.wishDBservice.getNumberOfItems() < 1) {
      this.wishStartMessage = "Currently you don't have any wish items!";
    } else {
      this.wishStartMessage = 'Please select a wish item!';
    }
  }
}
