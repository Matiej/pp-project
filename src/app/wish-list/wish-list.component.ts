import { Component, OnInit } from '@angular/core';
import { WishItem } from './wish-item/wish-item-model';
import { PictureSizeUrl } from '../shared/picture.size';
import { WishSharedService } from '../shared/wish-shared.service';
import { WishType } from './wish-item/wish-type';
import { TOAST_MESSAGES } from '../constants/toast-messages';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  wishItems: WishItem[] = [];
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private wishSharedService: WishSharedService) {}

  ngOnInit(): void {
    this.wishItems.push(...this.createWish());
    this.wishSharedService.getWishList().subscribe((wishList: WishItem[]) => {
      console.log(wishList);
      if (wishList && wishList.length > 0) {
        console.log('inside if');
        this.wishItems.push(...wishList);
        this.wishItems.reverse();
      }
    });

    this.wishSharedService.refreshWishCounter(this.wishItems.length);
  }

  public onRemoveWish(index: number): void {
    if (index >= 0 && index < this.wishItems.length) {
      this.wishItems.splice(index, 1);
      this.wishSharedService.refreshWishCounter(this.wishItems.length);
      this.showToastMessage(TOAST_MESSAGES.WISH_REMOVED_SUCCESSFULLY, 3000);
    }
  }

  private showToastMessage(message: string, timeout: number) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, timeout);
  }

  private createWish(): WishItem[] {
    const url1: PictureSizeUrl = new PictureSizeUrl(
      'https://covers.openlibrary.org/b/olid/OL4114773M-S.jpg',
      'https://covers.openlibrary.org/b/olid/OL4114773M-M.jpg',
      'https://covers.openlibrary.org/b/olid/OL4114773M-L.jpg',
      'OL4114773M'
    );
    const wish1: WishItem = new WishItem(
      'Important item',
      WishType.BOOK,
      'Star Trek - Odyssey - Avenger',
      '1987',
      "For almost three decades, William Shatner has portrated STAR TREK's gallant commander of the legendary Starship Enterprise and her crew. Now William Shatner brings his unique blend of talents as actor, writer, director, and producer, to tell the story only he can, of Captain Kirk's greatest adventure... The time: six months prior to the launch of the U.S.S. Enterprise 1701-B and the tragic loss of Captain James T. Kirk in deep space. The place: Earth, where the galaxy's most renowned hero must now face the specter of retirement and a life devoid of challenge and excitment. But in the apparent twilight of his career, Kirk's path takes an unexpected turn when a mysterious young woman offers him an irresistible adventure-- a perilous voyage to an uncharted planet where he will confront the ultimate threat to the fragile peace between the Federation and the Klingon Empire, and the ultimate temptation-- a chance to recapture his youth.",
      url1
    );

    const url2: PictureSizeUrl = new PictureSizeUrl(
      'https://covers.openlibrary.org/b/olid/OL7649451M-S.jpg',
      'https://covers.openlibrary.org/b/olid/OL7649451M-M.jpg',
      'https://covers.openlibrary.org/b/olid/OL7649451M-L.jpg',
      'OL7649451M'
    );
    const wish2: WishItem = new WishItem(
      'Important item',
      WishType.BOOK,
      'Star Odyssey',
      '2002',
      'As Commander William Riker resolved from the transporter beam beside the grave of that Starfleet legend, he was surprised by the sudden thought that had come to him',
      url2
    );

    return [wish1, wish2, wish1, wish2];
  }
}
