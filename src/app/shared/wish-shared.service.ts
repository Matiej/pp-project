import { Injectable } from '@angular/core';
import { BookDetailResponse } from '../book-api/books/book-detail/book-detail-response';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WishItem } from '../wish/wish-list/wish-item/wish-item-model';
import { PictureSizeUrl } from './picture.size';
import { WishType } from '../wish/wish-list/wish-item/wish-type';
import { InMemoryDatabaseService } from '../wish/service/in-memory-database.service';

@Injectable({
  providedIn: 'root',
})
export class WishSharedService {
  private _wishlist = new BehaviorSubject<WishItem[]>([]);
  private wishlist$ = new Observable<WishItem[]>();

  private _wishCounter = new BehaviorSubject<number>(0);
  private wishCounter$ = this._wishCounter.asObservable();

  constructor(private databaseService: InMemoryDatabaseService) {}

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
      console.log('service _whislist_getvale---', this._wishlist.getValue());
      console.log(
        'current list in shared service from _whislist_getvale---',
        currentWishList
      );
      currentWishList.push(item);
      this._wishlist.next(currentWishList);
      console.log(
        'this _whislist_getvale after next currentList',
        this._wishlist.getValue()
      );
      const currentWishiesNumber = currentWishList.length;
      this.refreshWishCounter(currentWishiesNumber);
    });
  }

  public getWishList(): Observable<WishItem[]> {
    console.log('getWishList');
    console.log(this._wishlist.getValue());
    return this._wishlist.asObservable();
  }

  public refreshWishCounter(wishiesNumber: number): void {
    this._wishCounter.next(wishiesNumber);
  }

  public getWishiesCounter(): Observable<number> {
    return this.wishCounter$;
  }

  public refreshWishList(wishItems: WishItem[]): void {
    console.log(this._wishlist.getValue());
    console.log("Refreshing wish list", wishItems);
    this._wishlist.next([]);
    this._wishlist.next(wishItems);
    console.log(this._wishlist.getValue());
  }
  
}
