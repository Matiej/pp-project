import { Injectable } from '@angular/core';
import { BookDetailResponse } from '../book-api/books/book-detail/book-detail-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WishItem } from '../wish-list/wish-item/wish-item-model';
import { PictureSizeUrl } from './picture.size';
import { WishType } from '../wish-list/wish-item/wish-type';

@Injectable({
  providedIn: 'root',
})
export class WishSharedService {
  private _wishlist = new BehaviorSubject<WishItem[]>([]);
  private wishlist$ = this._wishlist.asObservable();

  constructor() {}

  addToWishList(bookDetails: Observable<BookDetailResponse>): void {
    bookDetails.subscribe((bookDetails: BookDetailResponse) => {
      const picUrl: PictureSizeUrl = new PictureSizeUrl(
        bookDetails.book.coverUrls?.smallSizeCoverurl!,
        bookDetails.book.coverUrls?.mediumSizeCoverurl!,
        bookDetails.book.coverUrls?.largeSizeCoverurl!,
        bookDetails.book.coverCode!
      );

      const item: WishItem = new WishItem(
        bookDetails.book.author_name?.join(', ')!,
        WishType.BOOK,
        bookDetails.book.title!,
        bookDetails.book.first_publish_year?.toString()!,
        bookDetails.bookDetails.description!,
        picUrl
      );

      const currentWishList: WishItem[] = this._wishlist.getValue();
      currentWishList.push(item);
      this._wishlist.next(currentWishList);
    });
  }

  getWishList(): Observable<WishItem[]> {
    return this.wishlist$;
  }
}
