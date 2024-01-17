import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section26Service } from '../section26.service';
import { decrement, increment } from '../store/counter.actions';

@Component({
  selector: 'app-s26-controls',
  templateUrl: './s26-controls.component.html',
  styleUrls: ['./s26-controls.component.css'],
  standalone: true,
})
export class S26ControlsComponent {
  constructor(
    private section26Service: Section26Service,
    private store: Store
  ) {}

  public increment() {
    this.section26Service.increment();
    this.store.dispatch(increment())

  }
  public decrement() {
    this.store.dispatch(decrement())
    this.section26Service.decrement();
  }
}
