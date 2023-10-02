import { Injectable } from '@angular/core';
import { UserDatabaseService } from './user-database.service';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  constructor(private userDatabaseService: UserDatabaseService) {}
}
