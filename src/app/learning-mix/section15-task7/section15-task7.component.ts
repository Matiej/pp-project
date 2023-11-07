import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section15-task7',
  templateUrl: './section15-task7.component.html',
  styleUrls: ['./section15-task7.component.css'],
})
export class Section15Task7Component implements OnInit {
  projectForm!: FormGroup<any>;
  readonly section15Task7Title: string = 'Task7 Project Form';

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        projectname: new FormControl(
          null,
          [Validators.required],
          [this.forbiddenProjectNamelValidator]
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      projectStatusSelect: new FormControl('stable', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    this.projectForm.reset();
    this.projectForm.patchValue({
      projectStatusSelect: 'stable',
    });
  }

  forbiddenProjectNamelValidator(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const forbiddenName = 'test';
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === forbiddenName) {
          resolve({ isProjectNameForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
}
