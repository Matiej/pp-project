import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section28-animations',
  templateUrl: './section28-animations.component.html',
  styleUrl: './section28-animations.component.css',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'yellow',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal => highlighted', animate(200)),
      transition('highlighted => normal', animate(600)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'blue',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'green',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          'background-color': 'black',
          transform: 'translateX(0px) scale(0.5)',
        })
      ),
      transition('normal <=> highlighted', animate(200)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'yellow',
        }),
        animate(
          1000,
          style({ 'background-color': 'yellow', borderRadius: '50px' })
        ),
        animate(
          500
          // style({ 'background-color': 'black', borderRadius: '0px' })
        ),
      ]),
    ]),

    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),

      transition('void  => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(200),
      ]),

      transition('* => void', [
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),

    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),

      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-100px)',
              offset: 0
            }),
            style({
              opacity: 0.5,
              transform: 'translateX(-50px)',
              offset: 0.3
            }),
            style({
              opacity: 1,
              transform: 'translateX(-20px)',
              offset: 0.6
            }),
            style({
              opacity: 1,
              transform: 'translateX(30px)',
              offset: 0.8
            }),
            style({
              opacity: 1,
              transform: 'translateX(0px)',
              offset: 1
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class Section28AnimationsComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state: string = 'normal';
  wildState: string = 'normal';

  onAdd(item: any): void {
    this.list.push(item);
  }

  onDelete(item: any): void {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list.splice(item, index + 1);
    }
  }

  toggleState(): void {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink(): void {
    this.wildState = 'shrunken';
  }
}
