import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section30UnitTestsComponent } from '../section30-unit-tests.component';
import { UnitUserComponent } from './unit-user.component';
import { UnitUserService } from './unit-user.service';

describe('UnitUserComponent', () => {
  let component: UnitUserComponent;
  let fixture: ComponentFixture<UnitUserComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [Section30UnitTestsComponent, UnitUserComponent],
    });
    fixture = TestBed.createComponent(UnitUserComponent);
  });

  it('should create the application', () => {
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should use the user object from the component', () => {
    let app = fixture.debugElement.componentInstance;
    let user = app.user;
    expect(user.name).toBe('Maciej');
    expect(user.age).toBe(100);
  });

  it('should use the user object from the service', () => {
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UnitUserService);
    fixture.detectChanges();
    expect(userService.user.name).toEqual(app.user.name);
    expect(userService.user.age).toEqual(app.user.age);
  });

  it('should display the user name if user is logged in', () => {
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UnitUserService);
    app.isUnitUserLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      userService.user.name
    );
  });

  it('should display the correct title if user is logged in', () => {
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UnitUserService);
    app.isUnitUserLoggedIn = true;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toEqual(
      'Unit User Logged In'
    );
  });

  it('should display the correct title if user is NOT logged in', () => {
    let app = fixture.debugElement.componentInstance;
    let userService = fixture.debugElement.injector.get(UnitUserService);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toEqual(
      'Unit User Not logged In'
    );
  });

  it('should display the correct paragraph if user is NOT logged in', () => {
    // let app = fixture.debugElement.componentInstance;
    // let userService = fixture.debugElement.injector.get(UnitUserService);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toEqual(
      'Please log in first'
    );
  });
});
