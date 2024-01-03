import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilybookedslotComponent } from './familybookedslot.component';

describe('FamilybookedslotComponent', () => {
  let component: FamilybookedslotComponent;
  let fixture: ComponentFixture<FamilybookedslotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilybookedslotComponent]
    });
    fixture = TestBed.createComponent(FamilybookedslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
