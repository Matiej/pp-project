import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [
    { path: 'assets/im1.jpg', imageName: 'BMW R1200RT 2014-2019' },
    { path: 'assets/im2.jpg', imageName: 'BMW R1200RT 2010-2013' },
    { path: 'assets/im3.jpg', imageName: 'Moto Guzzi V85TT 2019`' },
    { path: 'assets/im4.jpg', imageName: 'Moto Guzzi V85TT 2021`' },
  ];

  title: string = 'Traning -Angular+TypeScript- application by Maciej Wójcik.';
}
