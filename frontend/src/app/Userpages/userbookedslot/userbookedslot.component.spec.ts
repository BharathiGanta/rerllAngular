import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookedslotComponent } from './userbookedslot.component';

describe('UserbookedslotComponent', () => {
  let component: UserbookedslotComponent;
  let fixture: ComponentFixture<UserbookedslotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserbookedslotComponent]
    });
    fixture = TestBed.createComponent(UserbookedslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
