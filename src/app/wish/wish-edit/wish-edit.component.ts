import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WISH_EDIT_BUTTON_METHODS } from '../wish-edit-button-methods-const';
import { WishItemDescription } from '../wish-list/wish-item/wish-item-description';
import { WishItem } from '../wish-list/wish-item/wish-item-model';
import { WishType, getWishType } from '../wish-list/wish-item/wish-type';

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
  childButtons$: Observable<ButtonDetails[]> = new Observable<
    ButtonDetails[]
  >();
  wishForm!: FormGroup;
  wishtypes = WishType;
  showToast: boolean = false;
  wishEditToastMessage: string = '';
  @Output() notifyIfWishAdded: EventEmitter<void> = new EventEmitter<void>();
  wishItem!: WishItem;

  constructor(
    private fb: FormBuilder,
    private wishSharedService: WishSharedService
  ) {}

  ngOnInit(): void {
    this.wishForm = this.fb.group({
      'name-title': ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childButtons$'] && changes['childButtons$'].currentValue) {
      this.wishEditButtons = [];
      this.subscribeButtonDetails();
    }
  }

  onButtonClick(method: string, event: Event) {
    switch (method) {
      case WISH_EDIT_BUTTON_METHODS.ADD_NEW_WISH_ITEM:
        this.onAddClick();
        break;
      case WISH_EDIT_BUTTON_METHODS.CLEAN_WISH_ITEM_FIELDS:
        this.onCleanClick();
        break;
      default:
        console.warn(`Method "${method}" not recognized.`);
    }
  }

  private onAddClick() {
    if (this.wishForm.valid) {
      const isSaved: boolean = this.wishSharedService.addNewItemToWishList(
        this.convertFormToWishItem(this.wishForm)
      );
      if (isSaved) {
        this.wishSharedService.changeStateWishItemNotifier.emit();
        this.showToastMessage(TOAST_MESSAGES.WISH_ADDED_SUCCESSFULLY, 3000);
      }
    }
    this.wishForm.reset();
  }

  //todo create shared service for toastmessages
  private showToastMessage(message: string, timeout: number): void {
    this.wishEditToastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.wishEditToastMessage = '';
    }, timeout);
  }

  private convertFormToWishItem(form: FormGroup): WishItem {
    const formData = form.value;
    const desc: WishItemDescription[] = [
      new WishItemDescription('DESCRIPTION', formData.description),
    ];

    const wishItem = new WishItem(
      formData['name-title'],
      getWishType(formData.type),
      desc,
      null
    );

    return wishItem;
  }

  private onCleanClick() {
    this.wishForm.reset();
  }

  private subscribeButtonDetails() {
    this.childButtons$.subscribe((wishEditButtons) => {
      this.wishEditButtons = wishEditButtons;
    });
  }
}
