import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InMemoryUserDataBase } from '../db/in-memory-user-database';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class UserDatabaseService  {
  private _usermDatabase!: InMemoryUserDataBase;
 

  constructor( ) {
    this._usermDatabase = new InMemoryUserDataBase();
    console.log('saving user');
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
    this.saveUser(user1);
    this.saveUser(user2);
    this.saveUser(user3);
    this.saveUser(user4);
    this.saveUser(user5);
  }

  saveUser(item: User): User | undefined {
    return this._usermDatabase.add(item);
  }

  findById(id: number): Observable<User | undefined> {
    return of(this._usermDatabase.get(id.toString()));
  }

  findAll(): Observable<User[]> {
 
    return of(this._usermDatabase.listAll());
  }

  removeById(id: number): boolean {
    return this._usermDatabase.remove(id.toString());
  }

  getNumberOfItems(): number {
    return this._usermDatabase.listAll().length;
  }
  
}
