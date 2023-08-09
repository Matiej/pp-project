import { AuthoreKey } from "./author-key";
import { DateType } from "./date-type";
import { WorkKey } from "./work-key";

export interface Book {
    publishers: string[];
    source_records: string[];
    title: string;
    covers: number[];
    isbn_13: string[];
    full_title: string;
    isbn_10: string[];
    publish_date: string;
    key: string;
    authors: AuthoreKey[];
    works: WorkKey[];
    type: {
        key: string;
    };
    latest_revision: number;
    revision: number;
    created: DateType;
    last_modified: DateType;
}