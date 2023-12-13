import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { WishitemService } from './service/wishitem.service';
import { ButtonDetails } from './wish-edit/wish-edit.component';
import { WishItem } from './wish-list/wish-item/wish-item-model';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css'],
})
export class WishComponent implements OnInit, OnDestroy {
  readonly wishComponentTitle: string = 'Your wishies and findings sector';
  wishEditBottomsForChild$: Observable<ButtonDetails[]> = new Observable<
    ButtonDetails[]
  >();
  $wishItemParentList: Observable<WishItem[]> = new Observable<WishItem[]>();
  isSpinner: boolean = false;
  isWishDetail: boolean = false;
  private _toastMessageSubscription!: Subscription;
  wishToastStyleClass: string = '';
  wishToastMessage: string = '';
  showToast: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wishService: WishitemService
  ) {}

  ngOnInit(): void {
    this._toastMessageSubscription =
      this.wishService.wishToastMessageEmiter.subscribe((toast) => {
        this.showToastMessage(
          toast.toastMessage,
          toast.timeout,
          toast.styleClass
        );
      });
  }

  ngOnDestroy(): void {
    if (this._toastMessageSubscription) {
      this._toastMessageSubscription.unsubscribe();
    }
  }

  onAddNewWish() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  private showToastMessage(
    message: string,
    timeout: number,
    messageStyle: string
  ): void {
    this.wishToastMessage = message;
    this.showToast = true;
    this.wishToastStyleClass = messageStyle;
    setTimeout(() => {
      this.showToast = false;
      this.wishToastMessage = '';
      this.wishToastStyleClass = '';
    }, timeout);
  }
}
