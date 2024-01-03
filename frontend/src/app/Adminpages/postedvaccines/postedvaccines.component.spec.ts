import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedvaccinesComponent } from './postedvaccines.component';

describe('PostedvaccinesComponent', () => {
  let component: PostedvaccinesComponent;
  let fixture: ComponentFixture<PostedvaccinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostedvaccinesComponent]
    });
    fixture = TestBed.createComponent(PostedvaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
