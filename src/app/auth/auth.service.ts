import { Injectable } from '@angular/core';
import { User } from '../user/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {}

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
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
