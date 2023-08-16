import { PictureSizeUrl } from "src/app/shared/picture.size";

export class WishItem {
  public name: string;
  public type: string;
  public title: string;
  public firstPublishYear: string;
  public description: string;
  public pictureUrl: PictureSizeUrl;

  constructor(
    name: string,
    type: string,
    title: string,
    firstPublishYear: string,
    description: string,
    pictureUrl: PictureSizeUrl
  ) {
    this.name = name;
    this.type = type;
    this.title = title;
    this.firstPublishYear = firstPublishYear;
    this.description = description;
    this.pictureUrl = pictureUrl;
  }
}
