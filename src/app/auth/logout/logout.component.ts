import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedAuthService } from '../shared-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private sharedAuthService: SharedAuthService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.sharedAuthService.userLoggedOUTotification();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
