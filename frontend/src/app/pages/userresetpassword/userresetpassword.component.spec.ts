import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserresetpasswordComponent } from './userresetpassword.component';

describe('UserresetpasswordComponent', () => {
  let component: UserresetpasswordComponent;
  let fixture: ComponentFixture<UserresetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserresetpasswordComponent]
    });
    fixture = TestBed.createComponent(UserresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
