import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-books-serch-bar',
  templateUrl: './books-serch-bar.component.html',
  styleUrls: ['./books-serch-bar.component.css'],
})
export class BooksSerchBarComponent {
  // selectedCriterias: string = 'title';
  private _selectedCriteria: string = 'title';
  selectSorting: string = 'new';
  searchValue: string = '';
  isSearchFiledDisabled: boolean = false;
  searchFiledPlaceholder: string = 'Enter your search';

  @Output()
  searchRequest: EventEmitter<{
    criteria: string;
    text: string;
    sorting: string;
  }> = new EventEmitter();

  get selectedCriteria(): string {
    return this._selectedCriteria;
  }

  set selectedCriteria(value: string) {
    this._selectedCriteria = value;
    if (this._selectedCriteria === 'subject') {
      this.searchFiledPlaceholder =
        'Subject search is not available temporarily';
      this.isSearchFiledDisabled = true;
    } else {
      this.searchFiledPlaceholder = 'Enter your search';
    }
    this.searchValue = '';
  }

  onSearchClick(searchText: HTMLInputElement): void {
    this.searchRequest.emit({
      criteria: this._selectedCriteria,
      text: searchText.value,
      sorting: this.selectSorting,
    });
    searchText.value = '';
  }
}
