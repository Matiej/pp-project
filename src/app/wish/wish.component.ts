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

  private _changeStateWishItemNotifier: EventEmitter<void> = new EventEmitter();

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

    this.$wishItemParentList = this.wishSharedService.getWishList();
  }

  onAddNewWish() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
