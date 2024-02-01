import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section30UnitTestsComponent } from './section30-unit-tests.component';
import { UnitUserComponent } from './unit-user/unit-user.component';

describe('App: pp-project, Component: Section30UnitTestsComponent', () => {
  let component: Section30UnitTestsComponent;
  let fixture: ComponentFixture<Section30UnitTestsComponent>;

  beforeEach(async () => {
    // await TestBed.configureTestingModule({
    //   imports: [Section30UnitTestsComponent]
    // })
    // .compileComponents();
    TestBed.configureTestingModule({
      declarations: [Section30UnitTestsComponent, UnitUserComponent],
    });

    fixture = TestBed.createComponent(Section30UnitTestsComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create the app', async () => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have a title: ''Section 30 - Unit Tests''`, async () => {
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toBe('Section 30 - Unit Tests');
  });

  it('should have render title in a h2 tag', async () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test h2 title');
  });

  it('should have render title in a h3 tag', async () => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain(
      'Section 30 - Unit Tests'
    );
  });
});
