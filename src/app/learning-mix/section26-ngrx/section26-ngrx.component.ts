import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { S26ControlsComponent } from './s26-controls/s26-controls.component';
import { S26OutputComponent } from './s26-output/s26-output.component';
import { init } from './store/counter.actions';

@Component({
  selector: 'app-section26-ngrx',
  templateUrl: './section26-ngrx.component.html',
  styleUrls: ['./section26-ngrx.component.css'],
  standalone: true,
  imports: [S26ControlsComponent, S26OutputComponent],
})
export class Section26NgrxComponent implements OnInit {

  constructor(private store: Store){}
 
  ngOnInit(): void {
    console.log('dispatching init action')
    this.store.dispatch(init())
  }

}
