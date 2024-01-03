import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMembersBookingComponent } from './familymembersbooking.component';

describe('FamilymembersbookingComponent', () => {
  let component: FamilyMembersBookingComponent ;
  let fixture: ComponentFixture< FamilyMembersBookingComponent >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMembersBookingComponent ]
    });
    fixture = TestBed.createComponent( FamilyMembersBookingComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
