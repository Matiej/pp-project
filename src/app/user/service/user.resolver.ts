import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of, take } from 'rxjs';
import { User } from '../user-model';
import { UserDatabaseService } from './user-database.service';

export const userResolver: ResolveFn<User | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  userDbService: UserDatabaseService = inject(UserDatabaseService)
): Observable<User | null> => {
  console.log('resolving user');
  const id = route.paramMap.get('id');
  if (id !== null && !isNaN(+id)) {
    return userDbService.findById(+id).pipe(
      map((item) => {
        if (item) {
          return item;
        } else {
          console.error('Item not found: ', id);
          return null;
        }
      }),
      take(1),
      catchError((error) => {
        console.error('Error fetching wish item: ', error);
        return of(null);
      })
    );
  } else {
    console.error('Invalid ID:', id);
    return of(null);
  }
};
