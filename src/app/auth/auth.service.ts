import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user-model';
import { AuthResponseData } from './auth-response-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  readonly signUpFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKHlrPi_CMaLJNw7FyOP6V3QWJQD9leKE';
  readonly sginInFireBaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKHlrPi_CMaLJNw7FyOP6V3QWJQD9leKE';
  constructor(private http: HttpClient) {}

  signUpFireBaseUser(
    email: string,
    pass: string
  ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpFireBaseUrl, {
      email: email,
      password: pass,
      returnSecureToken: true,
    });
  }

  signInFireBaseUser(
    email: string,
    pass: string
  ): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.sginInFireBaseUrl, {
      email: email,
      password: pass,
      returnSecureToken: true,
    });
  }

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      resolve(this.isLoggedIn);
    });

    return promise;
  }

  userLogin(password: string, user: User): void {
    if (user && user.password === password) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
