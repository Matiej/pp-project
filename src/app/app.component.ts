import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
readonly  title: string = 'pp-project';

constructor(private authService: AuthService){}

ngOnInit(): void {
  this.authService.autoLogin()
}
}
