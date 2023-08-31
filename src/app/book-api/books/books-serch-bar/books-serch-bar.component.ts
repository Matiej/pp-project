import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books-serch-bar',
  templateUrl: './books-serch-bar.component.html',
  styleUrls: ['./books-serch-bar.component.css'],
})
export class BooksSerchBarComponent implements OnInit {
  selectedCriteria: string = 'title';
  selectSorting: string = 'new';
  searchText: string = '';
 
  @Output()
  searchRequest: EventEmitter<{ criteria: string; text: string; sorting: string }> =
    new EventEmitter();

  ngOnInit(): void {
    console.log("ng")
  }

  onSearchClick(searchText: HTMLInputElement): void {
    console.log(this.selectedCriteria);
    this.searchRequest.emit({
      criteria: this.selectedCriteria,
      text: searchText.value,
      sorting: this.selectSorting
    });
    searchText.value = '';
  }
}
