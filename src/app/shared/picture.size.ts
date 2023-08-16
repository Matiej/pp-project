export class PictureSizeUrl {
  public smallSizeUrl: string;
  public mediumSizeUrl: string;
  public largeSizeUrl: string;
  public picCode: string;

  constructor(
    smallSizeUlr: string,
    mediumSizeUlr: string,
    largeSizeUlr: string,
    picCode: string
  ) {
    this.smallSizeUrl = smallSizeUlr;
    this.mediumSizeUrl = mediumSizeUlr;
    this.largeSizeUrl = largeSizeUlr;
    this.picCode = picCode;
  }
}
