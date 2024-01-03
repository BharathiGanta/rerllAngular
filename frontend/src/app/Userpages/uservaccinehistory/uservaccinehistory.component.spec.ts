import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservaccinehistoryComponent } from './uservaccinehistory.component';

describe('UservaccinehistoryComponent', () => {
  let component: UservaccinehistoryComponent;
  let fixture: ComponentFixture<UservaccinehistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UservaccinehistoryComponent]
    });
    fixture = TestBed.createComponent(UservaccinehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
