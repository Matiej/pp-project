import { Injectable } from '@angular/core';
import { User } from '../user-model';
import { UserDatabaseService } from './user-database.service';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  constructor(private userDatabaseService: UserDatabaseService) {}

  public getDefaultUser(): User[] {
    const user1: User = new User(
      'Maciek',
      'Wojcik',
      'maciek@usereml.com',
      1979
    );
    const user2: User = new User(
      'Anna',
      'Monetta',
      'annamoneta@usereml.com',
      1995
    );
    const user3: User = new User(
      'Stefan',
      'Batory',
      'stefan@usereml.com',
      1985
    );
    const user4: User = new User(
      'John',
      'Smith',
      'johnsmith@usereml.com',
      1979
    );
    const user5: User = new User(
      'Angelika',
      'Shmidt',
      'angl@usereml.com',
      1991
    );
    this.userDatabaseService.add(user1);
    this.userDatabaseService.add(user2);
    this.userDatabaseService.add(user3);
    this.userDatabaseService.add(user4);
    this.userDatabaseService.add(user5);
    return this.userDatabaseService.listAll();
  }
}
