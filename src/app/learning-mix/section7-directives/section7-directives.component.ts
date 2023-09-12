import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section7-directives',
  templateUrl: './section7-directives.component.html',
  styleUrls: ['./section7-directives.component.css'],
})
export class Section7DirectivesComponent implements OnInit {
  onlyOdd: boolean = false;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
  buttonName: string = 'Show only odd numbers';
  displaingNumbers: string = 'EVEN NUMERS ONLY';
  oddValue: number = 0;
  evenValue: number = 0;

  ngOnInit(): void {
    const no: number = this.getRandomNumber();
    
    if (no % 2 === 0) {
      this.evenValue = no;
    } else {
      this.oddValue = no;
    }
  }

  onButtonClick(): void {
    this.onlyOdd = !this.onlyOdd;
    this.buttonName = !this.onlyOdd
      ? 'Show only odd numbers'
      : 'Show only even numbers';

    this.displaingNumbers = !this.onlyOdd
      ? 'DISPLAYING EVEN NUMERS ONLY'
      : 'DISPLAYING ODD NUMERS ONLY';
  }

  private getRandomNumber(): number {
    const randomIndex = Math.floor(Math.random() * this.numbers.length);
    const randomNumber = this.numbers[randomIndex];
    return randomNumber;
  }
}
