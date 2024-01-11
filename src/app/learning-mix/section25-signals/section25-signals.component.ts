import { NgFor } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-section25-signals',
  templateUrl: './section25-signals.component.html',
  styleUrls: ['./section25-signals.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class Section25SignalsComponent {
  actions = signal<string[]>([]);
  signalCounter = signal(0);

  constructor() {
    effect(() =>
      console.log('test counter with effect function: ', this.signalCounter())
    );
  }

  increment() {
    this.signalCounter.update((oldCounter) => oldCounter + 1);
    this.actions.update((oldActions) => [...oldActions, 'increment']);
  }

  decrement() {
    this.signalCounter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldActions) => [...oldActions, 'decrement']);
  }
}
