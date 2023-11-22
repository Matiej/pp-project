import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { FirebaseUserDatabaseConnService } from '../db/firebase-user-database-conn.service';
import { InMemoryUserDataBase } from '../db/in-memory-user-database';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root',
})
export class UserDatabaseService {
  private _usermDatabase!: InMemoryUserDataBase;

  constructor(private userFirebaseDB: FirebaseUserDatabaseConnService) {
    this._usermDatabase = new InMemoryUserDataBase();

    const user1: User = new User(
      'Maciek',
      'Wojcik',
      'maciek@usereml.com',
      1979,
      false
    );
    user1.password = 'admin';
    user1.matchPassword = 'admin';

    const user2: User = new User(
      'Anna',
      'Monetta',
      'annamoneta@usereml.com',
      1995,
      true
    );
    user2.password = 'admin';
    user2.matchPassword = 'admin';

    // this.saveUserFirebase(user1)?.subscribe((data) => {
    //   console.log('subscribing to save the user. Saved date: ', data);
    // });
    // this.saveUserFirebase(user2)?.subscribe((data) => {
    //   console.log('subscribing to save the user. Saved date: ', data);
    // });
  }

  public saveUserFirebase(user: User): Observable<User | undefined> {
    return this.userFirebaseDB.saveUser(user).pipe(
      switchMap((savedUserID: { name: string }) => {
        console.log('saving user... : ', savedUserID.name);

        const savedUser: Observable<User | undefined> = this.findUserById(
          savedUserID.name
        );
        return savedUser;
      })
    );
  }

  public findUserById(id: string): Observable<User | undefined> {
    return this.findAllUsers().pipe(
      map((users) => {
        return users.length > 0
          ? users.find((user) => user.id === id)
          : undefined;
      })
    );
  }

  public findByEmail(email: string): Observable<User | undefined> {
    return this.findAllUsers().pipe(
      map((users: User[]) => {
        const user: User | undefined = users.find(callback_user);
        function callback_user(user: User): boolean {
          if (user.email === email) {
            return true;
          }
          return false;
        }

        return user;
      })
    );
  }

  public removeById(id: string): Observable<boolean> {
    return this.userFirebaseDB.deleteUserById(id);
  }

  public getNumberOfItems(): number {
    return this.userFirebaseDB.findAllUsers.length;
  }

  public findAllUsers(): Observable<User[]> {
    return this.userFirebaseDB.findAllUsers().pipe(
      map((response) => {
        const users: User[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const user = this.convertTouSer(response[key], key);
            users.push(user);
          }
        }
        return users;
      })
    );
  }

  private convertTouSer(userData: any, key: string): User {
    const user = new User(
      userData.name,
      userData.lastName,
      userData.email,
      userData.birthYear,
      userData.editable
    );
    user.id = key;
    if (userData._password) user.password = userData._password;
    if (userData._matchPassword) user.matchPassword = userData._matchPassword;
    if (userData._address1) user.address1 = userData._address1;
    if (userData._address2) user.address2 = userData._address2;
    if (userData._gender) user.gender = userData._gender;
    if (userData._secret) user.secret = userData._secret;
    if (userData._answer) user.answer = userData._answer;
    if (userData._about) user.about = userData._about;

    return user;
  }
}
