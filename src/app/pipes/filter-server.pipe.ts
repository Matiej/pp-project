import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterServer',
})
export class FilterServerPipe implements PipeTransform {
  transform(value: any, filteringString: string, propName: string): any {
    if (value.length === 0 || filteringString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (
        item[propName] &&
        item[propName].toLowerCase() === filteringString.toLowerCase()
      ) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
