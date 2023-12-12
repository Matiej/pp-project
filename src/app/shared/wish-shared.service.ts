import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
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
  private _wishToastMessageEmiter: EventEmitter<{
    toastMessage: string;
    styleClass: string;
    timeout: number;
  }> = new EventEmitter();

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
      this.databaseService.saveWish(item);
      this.refreshWishCounter(this.databaseService.getNumberOfItems());
    });
  }

  public addNewItemToWishList(
    wishitem: WishItem
  ): Observable<WishItem | undefined> {
    return this.databaseService.saveWish(wishitem).pipe(
      tap((savedwish: WishItem | undefined) => {
        if (savedwish) {
          this.refreshWishCounter(this.databaseService.getNumberOfItems());
          return savedwish;
        } else {
          return undefined;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  private handleError(errorResposne: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResposne.error || !errorResposne.error.error) {
      return throwError(() => this.prapreError(errorMessage, errorResposne));
    }

    switch (errorResposne.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email address already exists';
        break;
    }
    if (
      errorResposne.error.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')
    ) {
      errorMessage = 'Too many attempts, try again later!';
    }

    return throwError(() => this.prapreError(errorMessage, errorResposne));
  }

  private prapreError(
    errorMessage: string,
    error: HttpErrorResponse
  ): HttpErrorResponse {
    return new HttpErrorResponse({
      error: errorMessage,
      status: error.status,
      statusText: error.statusText,
    });
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

  public removeWishItem(wishItemId: string) {
    this.databaseService
      .removeById(wishItemId)
      .subscribe((isRemoved: boolean) => {
        if (isRemoved) {
          this.changeStateWishItemNotifier.emit();
          this._toastMessageNotifier.emit(
            TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY
          );
        } else {
          this._toastMessageNotifier.emit(
            TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY
          );
        }
      });
  }

  public removeWish(wishId: string) {}

  public get toastMessageNotifier(): EventEmitter<string> {
    return this._toastMessageNotifier;
  }
}
