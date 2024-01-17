import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Section26Service } from '../section26.service';
import { decrement } from '../store/counter.actions';
import { IncrementAction } from '../store/increment.action';

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
    this.store.dispatch(new IncrementAction(1));
  }
  public decrement() {
    this.store.dispatch(decrement({ value: 1 }));
    this.section26Service.decrement();
  }
}
