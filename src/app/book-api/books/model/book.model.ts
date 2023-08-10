import { SearchAuthor } from '../../openlibrary-api/model/search-author.model';
export class Book{

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

    public static convertToBook(searchAuthor: SearchAuthor): Book {
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
        book.author_name= searchAuthor.author_name;
        book.isbn= searchAuthor.isbn;
        return book;
    }
}