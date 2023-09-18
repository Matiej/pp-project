import { PictureSizeUrl } from 'src/app/shared/picture.size';
import { WishType } from './wish-type';
import { WishItemDescription } from './wish-item-description';

export class WishItem {
  private _id!: number;
  public name: string;
  public type: WishType;
  public descriptions: WishItemDescription[];
  public pictureUrl: PictureSizeUrl;

  constructor(
    name: string,
    type: WishType,
    description: WishItemDescription[],
    pictureUrl: PictureSizeUrl
  ) {
    this.name = name;
    this.type = type;
    this.descriptions = description;
    this.pictureUrl = pictureUrl;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
