import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookDetailResponse } from '../book-api/books/book-detail/book-detail-response';
import { BookDetails } from '../book-api/books/model/book.details.model';
import { Book } from '../book-api/books/model/book.model';
import { TOAST_MESSAGES } from '../constants/toast-messages';
import { WishDatabaseService } from '../wish/service/wish-database.service';
import { WishItemDescription } from '../wish/wish-list/wish-item/wish-item-description';
import { WishItem } from '../wish/wish-list/wish-item/wish-item-model';
import { WishType } from '../wish/wish-list/wish-item/wish-type';
import { PictureSizeUrl } from './picture.size';

@Injectable({
  providedIn: 'root',
})
export class WishSharedService {
  private _wishCounter = new BehaviorSubject<number>(0);
  private wishCounter$ = this._wishCounter.asObservable();
  changeStateWishItemNotifier: EventEmitter<void> = new EventEmitter();
  private _toastMessageNotifier: EventEmitter<string> = new EventEmitter();

  constructor(private databaseService: WishDatabaseService) {}

  public addBookToWishList(bookDetails: Observable<BookDetailResponse>): void {
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
        this.prepareDescription(bookDetails.bookDetails, bookDetails.book),
        picUrl
      );
      this.databaseService.saveWishItem(item);
      this.refreshWishCounter(this.databaseService.getNumberOfItems());
    });
  }

  public addNewItemToWishList(wishitem: WishItem): boolean {
    const savedWishItem: WishItem | undefined =
      this.databaseService.saveWishItem(wishitem);
    if (savedWishItem && savedWishItem.id) {
      this.refreshWishCounter(this.databaseService.getNumberOfItems());
      return true;
    } else {
      return false;
    }
  }

  private prepareDescription(
    bookDetails: BookDetails,
    book: Book
  ): WishItemDescription[] {
    const resultArray: WishItemDescription[] = [];

    if (bookDetails.description) {
      resultArray.push(
        new WishItemDescription('Description', bookDetails.description)
      );
    }

    if (book.author_name && book.author_name.length) {
      resultArray.push(
        new WishItemDescription('Authors', book.author_name.join(', '))
      );
    }

    if (book.first_publish_year) {
      resultArray.push(
        new WishItemDescription(
          'Publish Year',
          book.first_publish_year.toString()
        )
      );
    }
    return resultArray;
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
    const isRemoved: boolean = this.databaseService.removeById(wishItemId);
    if (isRemoved) {
      this.changeStateWishItemNotifier.emit();
      this._toastMessageNotifier.emit(TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY);
    }
  }

  public get toastMessageNotifier(): EventEmitter<string> {
    return this._toastMessageNotifier;
  }
}
