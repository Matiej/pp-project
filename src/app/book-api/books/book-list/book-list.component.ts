import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchAuthor } from '../model/search-author.model';
import { AUTHOR_SEARCH_RESULT } from '../database/books-database';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  readonly books: SearchAuthor[] = AUTHOR_SEARCH_RESULT;
  constructor() {}

  ngOnInit(): void {}
}
