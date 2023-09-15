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
      this.databaseService.saveWishItem(item);
      this.refreshWishCounter(this.databaseService.getNumberOfItems());
    });
  }

  public getWishList(): Observable<WishItem[]> {
    return this.databaseService.findAll();
  }

  public refreshWishCounter(wishiesNumber: number): void {
    this._wishCounter.next(wishiesNumber);
  }

  public getWishiesCounter(): Observable<number> {
    return this.wishCounter$;
  }

  public removeWishItem(wishItemId: number) {
    this.databaseService.removeById(wishItemId);
  }
}
