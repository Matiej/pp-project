import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-books-serch-bar',
  templateUrl: './books-serch-bar.component.html',
  styleUrls: ['./books-serch-bar.component.css'],
})
export class BooksSerchBarComponent {
  selectedCriteria: string = 'title';
  searchText: string = '';
  @Output()
  searchRequest: EventEmitter<{ criteria: string; text: string }> =
    new EventEmitter();

  onSearchClick(searchText: HTMLInputElement): void {
    console.log(this.selectedCriteria);
    this.searchRequest.emit({
      criteria: this.selectedCriteria,
      text: searchText.value,
    });
    searchText.value = '';
  }
}
