import { PictureSizeUrl } from 'src/app/shared/picture.size';
import { WishItemDescription } from './wish-item-description';
import { WishType } from './wish-type';

export class WishItem {
  private _id!: number;
  public name: string;
  public type: WishType;
  public descriptions: WishItemDescription[];
  public pictureUrl: PictureSizeUrl | null;

  constructor(
    name: string,
    type: WishType,
    description: WishItemDescription[],
    pictureUrl: PictureSizeUrl | null
  ) {
    this.name = name;
    this.type = type;
    this.descriptions = description;
    this.pictureUrl = pictureUrl || null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
