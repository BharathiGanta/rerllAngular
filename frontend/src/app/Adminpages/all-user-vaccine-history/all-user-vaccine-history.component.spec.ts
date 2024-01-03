import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserVaccineHistoryComponent } from './all-user-vaccine-history.component';

describe('AllUserVaccineHistoryComponent', () => {
  let component: AllUserVaccineHistoryComponent;
  let fixture: ComponentFixture<AllUserVaccineHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllUserVaccineHistoryComponent]
    });
    fixture = TestBed.createComponent(AllUserVaccineHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
