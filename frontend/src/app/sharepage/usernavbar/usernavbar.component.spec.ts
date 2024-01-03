import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernavbarComponent } from './usernavbar.component';

describe('UsernavbarComponent', () => {
  let component: UsernavbarComponent;
  let fixture: ComponentFixture<UsernavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernavbarComponent]
    });
    fixture = TestBed.createComponent(UsernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
