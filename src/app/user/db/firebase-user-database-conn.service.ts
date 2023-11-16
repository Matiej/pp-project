import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseUserDatabaseConnService {
  readonly fireBaseUsertUrl: string =
    'https://ppproject-35b60-default-rtdb.firebaseio.com/users.json';

  constructor(private http: HttpClient) {}

  public saveUser(user: User): Observable<any> {
    return this.http.post<{ name: string }>(this.fireBaseUsertUrl, user);
  }

  public findAllUsers(): Observable<{ [key: string]: User }> {
    return this.http.get<{ [key: string]: User }>(this.fireBaseUsertUrl);
  }
}
