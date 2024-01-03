import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevaccinesComponent } from './updatevaccines.component';

describe('UpdatevaccinesComponent', () => {
  let component: UpdatevaccinesComponent;
  let fixture: ComponentFixture<UpdatevaccinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatevaccinesComponent]
    });
    fixture = TestBed.createComponent(UpdatevaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
