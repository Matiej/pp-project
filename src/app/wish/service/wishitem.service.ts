import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  of,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SignInAuthResponse } from 'src/app/auth/signin-auth-response';
import { WishItem } from '../wish-list/wish-item/wish-item-model';
import { WishDatabaseService } from './wish-database.service';

@Injectable({
  providedIn: 'root',
})
export class WishitemService implements OnDestroy {
  private _wishToastMessageEmiter: EventEmitter<{
    toastMessage: string;
    styleClass: string;
    timeout: number;
  }> = new EventEmitter();
  private _signResponse!: SignInAuthResponse | null;

  private _wishItemsBehaviorSubject = new BehaviorSubject<WishItem[]>([]);
  private _wishCounterBehaviorSubject = new BehaviorSubject<number>(0);
  private _wishItemsSubscription!: Subscription;
  private _singInLoginRespSubj!: Subscription;

  constructor(
    private databaseService: WishDatabaseService,
    private authService: AuthService
  ) {
    this._singInLoginRespSubj = this.authService.singinLoginResposne.subscribe(
      (res: SignInAuthResponse | null) => {
        this._signResponse = res;
      }
    );
  }

  ngOnDestroy(): void {
    if (this._wishItemsSubscription) {
      this._wishItemsSubscription.unsubscribe();
    }

    if (this._singInLoginRespSubj) {
      this._singInLoginRespSubj.unsubscribe();
    }
  }

  public removeWishItem(wishItemId: string): Observable<boolean> {
    return this.databaseService.removeById(wishItemId).pipe(
      tap((isRemoved: boolean) => {
        return isRemoved;
      }),
      catchError((errorResposne: HttpErrorResponse) => {
        return this.handleError(errorResposne);
      })
    );
  }

  public addNewItemToWishList(
    wishitem: WishItem
  ): Observable<WishItem | undefined> {
    console.log(this._signResponse);
    if (this._signResponse === null || this._signResponse.user === undefined) {
      return of(undefined);
    }

    wishitem.userId = this._signResponse.user.id;
    return this.databaseService.saveWish(wishitem).pipe(
      tap((savedwish: WishItem | undefined) => {
        if (savedwish) {
          this.fetchAllWishItemsToListComponent();
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

  public findWishByid(wishID: string): Observable<WishItem | undefined> {
    return this.databaseService.findWishByid(wishID).pipe(
      tap((resposne: WishItem | undefined) => {
        console.log('found wishItem with id: ' + wishID);
        return resposne;
      }),
      catchError((errorResposne: HttpErrorResponse) => {
        return this.handleError(errorResposne);
      })
    );
  }

  public fetchAllWishItemsToListComponent(): void {
    this._wishItemsSubscription = this.findAll().subscribe({
      next: (wishItems: WishItem[]) => {
        if (this._signResponse && this._signResponse.user) {
          const userId = this._signResponse.user.id;
          const filteredWishItems = wishItems.filter(
            (item) => item.userId === userId
          );

          this._wishItemsBehaviorSubject.next(filteredWishItems);
          this.wishCounterBehaviorSubject.next(filteredWishItems.length);
        } else {
          this._wishItemsBehaviorSubject.next([]);
          this._wishCounterBehaviorSubject.next(0);
        }
      },
      error: (errorResposne: HttpErrorResponse) => {
        console.warn(
          'Error occurred while fetchin wishItem list ------ ,',
          errorResposne
        );
      },
    });
  }

  public findAll(): Observable<WishItem[]> {
    return this.databaseService.findAll().pipe(
      tap((wishItems: WishItem[]) => {
        console.log('fetched wishItems: ', wishItems.length);
      }),
      catchError((errorResposne: HttpErrorResponse) => {
        return this.handleError(errorResposne);
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

  public get wishToastMessageEmiter(): EventEmitter<{
    toastMessage: string;
    styleClass: string;
    timeout: number;
  }> {
    return this._wishToastMessageEmiter;
  }

  public emitWishToastMessage(
    message: string,
    styleClass: string,
    timeout: number
  ) {
    this._wishToastMessageEmiter.emit({
      toastMessage: message,
      styleClass: styleClass,
      timeout: timeout,
    });
  }

  public get wishItemsBehaviorSubject() {
    return this._wishItemsBehaviorSubject;
  }

  public get wishCounterBehaviorSubject() {
    return this._wishCounterBehaviorSubject;
  }
}
