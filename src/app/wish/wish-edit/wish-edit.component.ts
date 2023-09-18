import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class ButtonDetails {
  buttonName: string;
  buttonClass: string;
  buttonClickMethod: string;

  constructor(
    buttonName: string,
    buttonClass: string,
    buttonClickMethod: string
  ) {
    this.buttonName = buttonName;
    this.buttonClass = buttonClass;
    this.buttonClickMethod = buttonClickMethod;
  }
}

@Component({
  selector: 'app-wish-edit',
  templateUrl: './wish-edit.component.html',
  styleUrls: ['./wish-edit.component.css', '../wish.component.css'],
})
export class WishEditComponent implements OnChanges, OnInit {
 
  readonly editTitle: string = 'New Wish';
  wishEditButtons: ButtonDetails[] = [];
  @Input()
  childButtons$: Observable<ButtonDetails[]> = new Observable<ButtonDetails[]>();
  wishForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.wishForm = this.fb.group({
      'name-title': ['', Validators.required],  // Assuming it's a required field
      'type': ['', Validators.required],        // Assuming it's a required field
      'description': ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childButtons$'] && changes['childButtons$'].currentValue) {
      this.wishEditButtons = [];
      this.subscribeButtonDetails();
    }
  }

  setNewWishEditButtons(newWishEditButtons: ButtonDetails[]) {
    this.wishEditButtons = newWishEditButtons;
  }

  onButtonClick(method: string) {
    switch (method) {
      case 'ADD_NEW_WISH_ITEM':
        this.onAddClick();
        break;
      case 'CLEAN_WISH_ITEM_FIELDS':
        this.onCleanClick();
        break;
      default:
        console.warn(`Method "${method}" not recognized.`);
    }
  }

  private onAddClick() {
    console.log('onAddClick');
    if (this.wishForm.valid) {
      console.log('form valid to handle');
    }
  }

  private onCleanClick() {
    console.log('onCleanClick');

  }

  private subscribeButtonDetails() {
    this.childButtons$.subscribe((wishEditButtons) => {
      this.wishEditButtons = wishEditButtons;
      console.log(this.wishEditButtons);
    });
  }
}
