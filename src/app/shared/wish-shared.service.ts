import { Injectable } from '@angular/core';
import { BookDetailResponse } from '../book-api/books/book-detail/book-detail-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WishItem } from '../wish/wish-list/wish-item/wish-item-model';
import { PictureSizeUrl } from './picture.size';
import { WishType } from '../wish/wish-list/wish-item/wish-type';

@Injectable({
  providedIn: 'root',
})
export class WishSharedService {
  private _wishlist = new BehaviorSubject<WishItem[]>([]);
  private wishlist$ = new Observable<WishItem[]>();
  private _wishCounter = new BehaviorSubject<number>(0);
  private wishCounter$ = this._wishCounter.asObservable();

  constructor() {}

  public addToWishList(bookDetails: Observable<BookDetailResponse>): void {
    bookDetails.subscribe((bookDetails: BookDetailResponse) => {
      const picUrl: PictureSizeUrl = new PictureSizeUrl(
        bookDetails.book.coverUrls?.smallSizeCoverurl!,
        bookDetails.book.coverUrls?.mediumSizeCoverurl!,
        bookDetails.book.coverUrls?.largeSizeCoverurl!,
        bookDetails.book.coverCode!
      );

      const item: WishItem = new WishItem(
        bookDetails.book.title!,
        WishType.BOOK,
        bookDetails.bookDetails.description! +
          ' ||AUTHORS: ' +
          bookDetails.book.author_name?.join(', ')! +
          ' ||PUBLISH YEAR:' +
          bookDetails.book.first_publish_year?.toString()!,
        picUrl
      );

      const currentWishList: WishItem[] = this._wishlist.getValue();
      currentWishList.push(item);
      this._wishlist.next(currentWishList);

      const currentWishiesNumber = this._wishCounter.value + 1;
      this.refreshWishCounter(currentWishiesNumber);
    });
  }

  public getWishList(): Observable<WishItem[]> {
    this.wishlist$ = this._wishlist.asObservable();
    return this.wishlist$;
  }

  public refreshWishCounter(wishiesNumber: number): void {
    this._wishCounter.next(wishiesNumber);
  }

  public getWishiesCounter(): Observable<number> {
    return this.wishCounter$;
  }
}
