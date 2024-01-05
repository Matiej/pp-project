import { PictureSizeUrl } from 'src/app/shared/picture.size';
import { WishItemDescription } from './wish-item-description';
import { WishType } from './wish-type';

export class WishItem {
  private _id!: string;
  private _userId!: string;

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

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }
}
