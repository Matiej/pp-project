import { SearchBook } from '../../openlibrary-api/model/search-book.model';
import { CoverSize } from './cover-size';
export class Book {
  private static readonly COVER_ULR: string = 'https://covers.openlibrary.org/b/olid/';
  private static readonly COVER_SMALL_SIZE: string = '-S';
  private static readonly COVER_MEDIUM_SIZE: string = '-M';
  private static readonly COVER_LARGE_SIZE: string = '-L';
  private static readonly COVER_URL_POSTFIX: string = '.jpg';

  public title?: string;
  public title_suggest?: string;
  public title_sort?: string;
  public first_publish_year?: number;
  public number_of_pages_median?: number;
  public ebook_access?: string;
  public has_fulltext?: boolean;
  public cover_edition_key?: string;
  public language?: string[];
  public author_key?: string[];
  public author_name?: string[];
  public isbn?: string[];
  public coverUrls?: CoverSize;
  public coverCode?: string;

  public static convertToBook(searchAuthor: SearchBook): Book {
    const book = new Book();
    book.title = searchAuthor.title;
    book.title_suggest = searchAuthor.title_suggest;
    book.title_sort = searchAuthor.title_sort;
    book.first_publish_year = searchAuthor.first_publish_year;
    book.number_of_pages_median = searchAuthor.number_of_pages_median;
    book.ebook_access = searchAuthor.ebook_access;
    book.has_fulltext = searchAuthor.has_fulltext;
    book.cover_edition_key = searchAuthor.cover_edition_key;
    book.language = searchAuthor.language;
    book.author_key = searchAuthor.author_key;
    book.author_name = searchAuthor.author_name;
    book.isbn = searchAuthor.isbn;
    book.coverUrls = this.prepareCoverUlr(searchAuthor.cover_edition_key!)
    book.coverCode = searchAuthor.cover_edition_key ? searchAuthor.cover_edition_key : '';
 
     return book;
  }

  public static convertToBookList(searchBooks: SearchBook[]): Book[] {
    const books = []
    for(const element of searchBooks) {
      books.push(Book.convertToBook(element));
    }
    return books;
  }

  private static prepareCoverUlr(coverKey: string): CoverSize {
    
    if(coverKey && coverKey != undefined) {
      return {
        smallSizeCoverurl: this.COVER_ULR + coverKey + this.COVER_SMALL_SIZE + this.COVER_URL_POSTFIX,
        mediumSizeCoverurl: this.COVER_ULR + coverKey + this.COVER_MEDIUM_SIZE + this.COVER_URL_POSTFIX,
        largeSizeCoverurl: this.COVER_ULR + coverKey + this.COVER_LARGE_SIZE + this.COVER_URL_POSTFIX
    
      };
    }
     return {
      smallSizeCoverurl: '',
      mediumSizeCoverurl: "",
      largeSizeCoverurl: ""
    };
  }
 
}
