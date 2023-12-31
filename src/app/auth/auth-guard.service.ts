import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const auth = await this.authService.isUserLoggedIn.getValue();
   
      if (auth) {
        return true;
      } else {
        return this.router.createUrlTree(['/login']);
      }
    } catch (error) {
      console.error(error);
      return this.router.createUrlTree(['/']);
    }
  }
}
