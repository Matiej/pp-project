export enum WishType {
  BOOK = 'BOOK',
  OTHER = 'OTHER',
}

export function getWishType(value: string): WishType {
 
  if (Object.values(WishType).includes(value as WishType)) {
    return value as WishType;
  }
  return WishType.OTHER;
}
