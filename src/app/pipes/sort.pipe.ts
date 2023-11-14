import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: any, fieldName: string, ascending: boolean): any {
    if (value.length > 0 && Object.keys(value[0]).includes(fieldName)) {
      if (ascending) {
        return this.sortAscending(value, fieldName);
      } else {
        return this.sortDescending(value, fieldName);
      }
    } else {
      return value;
    }
  }

  private sortAscending(servers: [], fieldName: string): any {
    return servers.sort((a, b) => {
      if (a[fieldName] < b[fieldName]) {
        return -1;
      }
      if (a[fieldName] > b[fieldName]) {
        return 1;
      }
      return 0;
    });
  }

  private sortDescending(servers: [], fieldName: string): any {
    return servers.sort((a, b) => {
      if (a[fieldName] > b[fieldName]) {
        return -1;
      }
      if (a[fieldName] < b[fieldName]) {
        return 1;
      }
      return 0;
    });
  }
}
