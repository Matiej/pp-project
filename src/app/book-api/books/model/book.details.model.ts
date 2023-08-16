import { AuthoreKey } from '../../openlibrary-api/model/author-key.model';
import { OpenLibraryBook } from '../../openlibrary-api/model/opeLibrary.book.model';
import { Book } from './book.model';

export class BookDetails {
  private _subjects?: string[];
  private _key?: string;
  private _title?: string;
  private _authors?: string[];
  private _type?: string;
  private _covers?: number[];
  private _description?: string;
  private _subject_places?: string[];
  private _subject_people?: string[];
  private _subject_times?: string[];
  private _latest_revision?: number;
  private _revision?: number;
  private _created?: Date;
  private _last_modified?: Date;

  get subjects(): string[] | undefined {
    return this._subjects;
  }

  set subjects(value: string[] | undefined) {
    this._subjects = value;
  }

  get key(): string | undefined {
    return this._key;
  }

  set key(value: string | undefined) {
    this._key = value;
  }

  get title(): string | undefined {
    return this._title;
  }

  set title(value: string | undefined) {
    this._title = value;
  }

  get authors(): string[] | undefined {
    return this._authors;
  }

  set authors(value: string[] | undefined) {
    this._authors = value;
  }

  get type(): string | undefined {
    return this._type;
  }

  set type(value: string | undefined) {
    this._type = value;
  }

  get covers(): number[] | undefined {
    return this._covers;
  }

  set covers(value: number[] | undefined) {
    this._covers = value;
  }

  get description(): string | undefined {
    return this._description;
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  get subject_places(): string[] | undefined {
    return this._subject_places;
  }

  set subject_places(value: string[] | undefined) {
    this._subject_places = value;
  }

  get subject_people(): string[] | undefined {
    return this._subject_people;
  }

  set subject_people(value: string[] | undefined) {
    this._subject_people = value;
  }

  get subject_times(): string[] | undefined {
    return this._subject_times;
  }

  set subject_times(value: string[] | undefined) {
    this._subject_times = value;
  }

  get latest_revision(): number | undefined {
    return this._latest_revision;
  }

  set latest_revision(value: number | undefined) {
    this._latest_revision = value;
  }

  get revision(): number | undefined {
    return this._revision;
  }

  set revision(value: number | undefined) {
    this._revision = value;
  }

  get created(): Date | undefined {
    return this._created;
  }

  set created(value: Date | undefined) {
    this._created = value;
  }

  get last_modified(): Date | undefined {
    return this._last_modified;
  }

  set last_modified(value: Date | undefined) {
    this._last_modified = value;
  }

  public static convertToBookDetails(
    libraryBook: OpenLibraryBook
  ): BookDetails {
    const details: BookDetails = new BookDetails();
    details.subjects = libraryBook.subjects;
    details.key = libraryBook.key;
    details.title = libraryBook.title;
    details.authors = this.convertAuthors(libraryBook.authors);
    details.type = libraryBook.type?.key;
    details.covers = libraryBook.covers;
    details.description = libraryBook.description;
    details.subject_places= libraryBook.subject_places;
    details.subject_people = libraryBook.subject_people;
    details.subject_times = libraryBook.subject_times;
    details.latest_revision = libraryBook.latest_revision;
    details.revision = libraryBook.revision;
    details.created = libraryBook.created?.value;
    details.last_modified = libraryBook.last_modified?.value;

    return details;
  }

  private static convertAuthors(authorsKey?: AuthoreKey[]): string[] {
    const authors: string[] = [];
    authorsKey?.forEach((author) => authors.push());

    return authors;
  }
}
