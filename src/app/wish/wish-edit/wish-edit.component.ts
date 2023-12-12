import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/auth/can-deactivate-guard.service';
import { TOAST_MESSAGES } from 'src/app/constants/toast-messages';
import { WishSharedService } from 'src/app/shared/wish-shared.service';
import { WishDatabaseService } from '../service/wish-database.service';
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
export class WishEditComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
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
  allwoToEdit: boolean = true;
  changesSaved: boolean = false;
  private _paramSubscription?: Subscription;
  styleClass: string = '';
  private _wishSharedServiceSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private wishSharedService: WishSharedService,
    private wishItemDataBaseService: WishDatabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.wishForm = this.fb.group({
      nameTitle: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.wishEditButtons = this.getNewWishItemButtons();

    this._paramSubscription = this.route.params.subscribe((params: Params) => {
      const wishId: string = params['id'];
      if (wishId) {
        this.wishItemDataBaseService.findWishByid(wishId).subscribe((wish) => {
          if (wish) {
            this.wishItem = wish;
            this.fillOutForm(wish);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this._paramSubscription) {
      this._paramSubscription?.unsubscribe();
    }

    if(this._wishSharedServiceSubs) {
      this._wishSharedServiceSubs.unsubscribe();
    }
  }

  canComponentDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    const formData = this.wishForm.value;

    if (!this.allwoToEdit) {
      return true;
    }
    if (this.isAnyWishFieldHasChanged(this.wishItem)) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }

  private isAnyWishFieldHasChanged(wishItem: WishItem): boolean {
    const formData = this.wishForm.value;
    if (
      !this.wishItem &&
      (formData.nameTitle !== '' ||
        formData.description !== '' ||
        formData.type !== '') &&
      !this.changesSaved
    ) {
      return true;
    } else if (
      this.wishItem &&
      (formData.nameTitle !== wishItem.name ||
        formData.type !== wishItem.type ||
        formData.description !== this.getItemDesc(wishItem.descriptions)) &&
      !this.changesSaved
    ) {
      return true;
    } else {
      return false;
    }
  }

  onButtonClick(method: string, event: any) {
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

  private fillOutForm(item: WishItem): void {
    let valueToSet = {
      nameTitle: item.name,
      type: item.type,
      description: this.getItemDesc(item.descriptions),
    };

    this.wishForm.setValue(valueToSet);
  }

  private getItemDesc(wishItemDesc: WishItemDescription[]): string {
    let desc: string = '';
    wishItemDesc.forEach((descr) => {
      desc += descr.name + ': ' + descr.content + ', ';
    });
    return desc;
  }

  private onAddClick() {
    if (this.wishForm.valid) {
    this._wishSharedServiceSubs =   this.wishSharedService
        .addNewItemToWishList(this.convertFormToWishItem(this.wishForm))
        .subscribe({
          next: (wish: WishItem | undefined) => {
            if (wish) {
              this.wishSharedService.changeStateWishItemNotifier.emit();
              this.showToastMessage(
                TOAST_MESSAGES.WISH_ADDED_SUCCESSFULLY,
                TOAST_MESSAGES.SUCCESS_MESSAGE_STYLE,
                3000
              );
              this.changesSaved = true;
              this.wishForm.reset();
            } else {
              this.changesSaved = false;
              this.showToastMessage(
                TOAST_MESSAGES.WISH_ADDING_ERROR,
                TOAST_MESSAGES.DANGER_MESSAGE_STYLE,
                3000
              );
            }
          },
          error: (errorRes: HttpErrorResponse) => {
            this.changesSaved = false;
            let errorMessage = 'An uknown error occurred';
            if (errorRes.error) {
              errorMessage = errorRes.error;
            }
            this.showToastMessage(
              TOAST_MESSAGES.WISH_ADDING_ERROR +
                ' ------------ ' +
                errorMessage,
              TOAST_MESSAGES.DANGER_MESSAGE_BIG_STYLE,
              4000
            );
            console.warn('Wish adding error:   ', errorMessage);
          },
        });
    }
  }

  //todo create shared service for toastmessages
  private showToastMessage(
    message: string,
    styleClass: string,
    timeout: number
  ): void {
    this.wishEditToastMessage = message;
    this.styleClass = styleClass;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.wishEditToastMessage = '';
    }, timeout);
  }

  private convertFormToWishItem(form: FormGroup): WishItem {
    const formData = form.value;

    const desc: WishItemDescription[] = [
      new WishItemDescription('DESCRIPTION:', formData.description),
    ];

    const wishItem = new WishItem(
      formData['nameTitle'],
      getWishType(formData.type),
      desc,
      null
    );

    return wishItem;
  }

  private onCleanClick() {
    this.wishForm.reset();
  }

  isSaveButtonDisabeled(buttonName: string): boolean {
    if (buttonName === 'SAVE' && this.wishForm.valid) {
      return false;
    } else if (buttonName === 'SAVE' && !this.wishForm.valid) {
      return true;
    } else {
      return false;
    }
  }

  private getNewWishItemButtons(): ButtonDetails[] {
    const add = new ButtonDetails(
      'SAVE',
      'btn btn-primary',
      WISH_EDIT_BUTTON_METHODS.ADD_NEW_WISH_ITEM
    );

    const clean = new ButtonDetails(
      'CLEAN',
      'btn btn-warning',
      WISH_EDIT_BUTTON_METHODS.CLEAN_WISH_ITEM_FIELDS
    );

    return [add, clean];
  }
}
