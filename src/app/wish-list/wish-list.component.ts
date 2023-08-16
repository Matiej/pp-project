import { Component, OnInit } from '@angular/core';
import { WishItem } from './wish-item/wish-item-model';
import { PictureSizeUrl } from '../shared/picture.size';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  wishItems: WishItem[] = [];

  ngOnInit(): void {
    this.wishItems.push(this.createWish())
  }

  private createWish(): WishItem {
    const url: PictureSizeUrl = new PictureSizeUrl(
      "https://covers.openlibrary.org/b/olid/OL4114773M-S.jpg",
      "https://covers.openlibrary.org/b/olid/OL4114773M-M.jpg",
      "https://covers.openlibrary.org/b/olid/OL4114773M-L.jpg",
      "OL4114773M"
    )
    return new WishItem(
      "Important item",
      "BOOK", "Star Trek - Odyssey - Avenger", "1987",
      "For almost three decades, William Shatner has portrated STAR TREK's gallant commander of the legendary Starship Enterprise and her crew. Now William Shatner brings his unique blend of talents as actor, writer, director, and producer, to tell the story only he can, of Captain Kirk's greatest adventure... The time: six months prior to the launch of the U.S.S. Enterprise 1701-B and the tragic loss of Captain James T. Kirk in deep space. The place: Earth, where the galaxy's most renowned hero must now face the specter of retirement and a life devoid of challenge and excitment. But in the apparent twilight of his career, Kirk's path takes an unexpected turn when a mysterious young woman offers him an irresistible adventure-- a perilous voyage to an uncharted planet where he will confront the ultimate threat to the fragile peace between the Federation and the Klingon Empire, and the ultimate temptation-- a chance to recapture his youth.",
      url
    )
  }
}
