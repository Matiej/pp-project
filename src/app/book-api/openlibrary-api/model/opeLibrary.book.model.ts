import { AuthoreKey } from './author-key.model';
import { DateType } from './date-type.model';
import { WorkKey } from './work-key';

export interface OpenLibraryBook {
  publishers?: string[];
  source_records: string[];
  title: string;
  covers: number[];
  isbn_13: string[];
  full_title: string;
  isbn_10?: string[];
  publish_date?: string;
  key: string;
  authors: AuthoreKey[];
  works: WorkKey[];
  type: {
    key: string;
  };
  latest_revision?: number;
  revision?: number;
  created?: DateType;
  last_modified?: DateType;
  description?: string;
  subject_places?: string[]; // optional as it might not always be present
  subject_people?: string[]; // optional as it might not always be present
  subject_times?: string[]; //
}
