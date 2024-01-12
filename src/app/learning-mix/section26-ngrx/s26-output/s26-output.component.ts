import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Section26Service } from '../section26.service';

@Component({
  selector: 'app-s26-output',
  templateUrl: './s26-output.component.html',
  styleUrls: ['./s26-output.component.css'],
  standalone: true,
})
export class S26OutputComponent implements OnInit, OnDestroy {
  counter: number = 0;
  counterServiceSub?: Subscription;

  constructor(private counterService: Section26Service) {}

  ngOnInit(): void {
    this.counterServiceSub = this.counterService.counterChanged.subscribe(
      (counter) => (this.counter = counter)
    );
  }

  ngOnDestroy(): void {
    if (this.counterServiceSub) {
      this.counterServiceSub.unsubscribe();
    }
  }
}
