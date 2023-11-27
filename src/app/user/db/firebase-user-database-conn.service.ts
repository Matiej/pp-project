import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseUserDatabaseConnService {
  readonly fireBaseUsertUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/users.json';
  readonly fireBaseUsertBasicUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/users/';

  constructor(private http: HttpClient) {}

  public saveUser(user: User): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.fireBaseUsertUrl, user);
  }

  public findAllUsers(): Observable<{ [key: string]: User }> {
    return this.http.get<{ [key: string]: User }>(this.fireBaseUsertUrl);
  }

  public deleteAllUsers(): Observable<boolean> {
    return this.http.delete<boolean>(this.fireBaseUsertUrl);
  }

  public deleteUserById(userID: string): Observable<HttpResponse<any>> {
    const partUrl = userID + '.json';
    return this.http.delete<HttpResponse<any>>(
      this.fireBaseUsertBasicUrl + partUrl,
      { observe: 'response' }
    );
  }

  public updateUserById(user: User): Observable<HttpResponse<any>> {
    const updateUrl = this.fireBaseUsertBasicUrl + user.id + '.json';
    return this.http.put<HttpResponse<any>>(updateUrl, user, {
      observe: 'response',
    });
  }

  public findUserById(userId: string): Observable<HttpResponse<any>> {
    const userByIdUrl = this.fireBaseUsertBasicUrl + userId + '.json';
    return this.http.get<HttpResponse<any>>(userByIdUrl, {
      observe: 'response',
    });
  }
}
