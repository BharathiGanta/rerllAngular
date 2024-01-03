import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVaccineSlotComponent } from './bookvaccineslot.component';

describe('BookvaccineslotComponent', () => {
  let component: BookVaccineSlotComponent;
  let fixture: ComponentFixture<BookVaccineSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookVaccineSlotComponent]
    });
    fixture = TestBed.createComponent(BookVaccineSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
