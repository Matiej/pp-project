import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { WishItem } from '../wish-list/wish-item/wish-item-model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWishDatabaseService {
  readonly fireBaseWishestUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/wishes.json';
  readonly fireBaseWishBasicUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/wishes/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public saveWish(wish: WishItem): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.fireBaseWishestUrl, wish);
  }

  public findAllWishes(): Observable<{ [key: string]: WishItem }> {
    return this.http.get<{ [key: string]: WishItem }>(this.fireBaseWishestUrl);
  }

  public deleteAllWishes(): Observable<boolean> {
    return this.http.delete<boolean>(this.fireBaseWishestUrl);
  }

  public deleteWishById(wishID: string): Observable<HttpResponse<any>> {
    const partUrl = wishID + '.json';
    return this.http.delete<HttpResponse<any>>(
      this.fireBaseWishBasicUrl + partUrl,
      { observe: 'response' }
    );
  }

  public updateWishById(wish: WishItem): Observable<HttpResponse<any>> {
    const updateUrl = this.fireBaseWishBasicUrl + wish.id + '.json';
    return this.http.put<HttpResponse<any>>(updateUrl, wish, {
      observe: 'response',
    });
  }

  public findWishById(wishID: string): Observable<HttpResponse<any>> {
    const wishByIdUrl = this.fireBaseWishBasicUrl + wishID + '.json';
    return this.http.get<HttpResponse<any>>(wishByIdUrl, {
      observe: 'response',
    });
  }
}
