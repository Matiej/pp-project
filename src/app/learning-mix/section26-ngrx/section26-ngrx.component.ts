import { Component } from '@angular/core';
import { S26ControlsComponent } from './s26-controls/s26-controls.component';
import { S26OutputComponent } from './s26-output/s26-output.component';

@Component({
  selector: 'app-section26-ngrx',
  templateUrl: './section26-ngrx.component.html',
  styleUrls: ['./section26-ngrx.component.css'],
  standalone: true,
  imports: [S26ControlsComponent, S26OutputComponent],
})
export class Section26NgrxComponent {}
