import { Component } from '@angular/core';
import { Section26Service } from '../section26.service';

@Component({
  selector: 'app-s26-controls',
  templateUrl: './s26-controls.component.html',
  styleUrls: ['./s26-controls.component.css'],
  standalone: true,
})
export class S26ControlsComponent {
  constructor(private section26Service: Section26Service) {}

  public increment() {
    this.section26Service.increment();
  }
  public decrement() {
    this.section26Service.decrement();
  }
}
