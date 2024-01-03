import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableVaccineComponent } from './available-vaccine.component';

describe('AvailableVaccineComponent', () => {
  let component: AvailableVaccineComponent;
  let fixture: ComponentFixture<AvailableVaccineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableVaccineComponent]
    });
    fixture = TestBed.createComponent(AvailableVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
