import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BookDetailResponse } from './book-detail-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css', '../book-list/book-list.component.css'],
})
export class BookDetailComponent implements OnInit, OnChanges {
  @Output()
  closeDetails: EventEmitter<void> = new EventEmitter();

  @Input()
  $incomingBookDetailResponse: Observable<BookDetailResponse> | undefined;
  bookDetailResponse: BookDetailResponse | undefined;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngchanges');
    console.log(changes['$incomingBookDetailResponse'].currentValue);

    if (
      changes['$incomingBookDetailResponse'] &&
      changes['$incomingBookDetailResponse'].currentValue
    ) {
      this.getBookDetail();
    }
  }

  onCloseClick(): void {
    this.closeDetails.emit();
  }

  openLargeImage(largeSizeCoverurl: string | undefined) {
    const width = 800; 
    const height = 600;
    const features = `width=${width},height=${height}`;
    window.open(largeSizeCoverurl, '_blank', features);
  }

  private getBookDetail(): void {
    this.$incomingBookDetailResponse?.subscribe(
      (detailResponse: BookDetailResponse) => {
        this.bookDetailResponse = detailResponse;
      },
      (error: any) => {
        console.log('An error occurred during book detail fetch: ' + error);
      }
    );
  }
}
