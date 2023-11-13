import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shroten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit?: number): any {
    if (limit && value.length > limit) {
      return value.substr(0, limit) + ' ...;';
    }
    return value;
  }
}
