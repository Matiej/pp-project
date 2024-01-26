import { Component } from '@angular/core';

@Component({
  selector: 'app-section30-unit-tests',
  // standalone: true,
  // imports: [],
  templateUrl: './section30-unit-tests.component.html',
  styleUrl: './section30-unit-tests.component.css',
})
export class Section30UnitTestsComponent {
  readonly title: string = 'Section 30 - Unit Tests';
  
  onUnit2() {
    console.log('start unit2 tests');
  }
  onUnit1() {
    console.log('start unit1 tests');
  }
}
