import { PictureSizeUrl } from 'src/app/shared/picture.size';
import { WishType } from './wish-type';

export class WishItem {
  private _id!: number;
  public name: string;
  public type: WishType;
  public description: string;
  public pictureUrl: PictureSizeUrl;

  constructor(
    name: string,
    type: WishType,
    description: string,
    pictureUrl: PictureSizeUrl
  ) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.pictureUrl = pictureUrl;
  }

  get id(): number{
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
}
