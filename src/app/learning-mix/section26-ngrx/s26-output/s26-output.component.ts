import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Section26Service } from '../section26.service';

@Component({
  selector: 'app-s26-output',
  templateUrl: './s26-output.component.html',
  styleUrls: ['./s26-output.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class S26OutputComponent implements OnInit, OnDestroy {
  counter: number = 0;
  counterServiceSub?: Subscription;
  sotreCounter$: Observable<number>;

  constructor(
    private counterService: Section26Service,
    private store: Store<{ counterKey: number }>
  ) {
    this.sotreCounter$ = store.select('counterKey');
  }

  ngOnInit(): void {
    this.counterServiceSub = this.counterService.counterChanged.subscribe(
      (counter: number) => (this.counter = counter)
    );
  }

  ngOnDestroy(): void {
    if (this.counterServiceSub) {
      this.counterServiceSub.unsubscribe();
    }
  }
}
