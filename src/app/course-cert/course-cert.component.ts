import { Component, OnInit } from '@angular/core';
import { ASSETS_PATHS } from '../constants/assets-paths';

@Component({
  selector: 'app-course-cert',
  templateUrl: './course-cert.component.html',
  styleUrls: ['./course-cert.component.css'],
})
export class CourseCertComponent implements OnInit {
  certPngSrc: string = ASSETS_PATHS.COURSE_CERT_FILE_SOURCE;
  readonly certTitle: string = 'Angular - The Complete Guide (2023 Edition)';

  ngOnInit(): void {
    
  }
}
