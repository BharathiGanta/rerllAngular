import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCertificateComponent } from './vaccination-certificate.component';

describe('VaccinationCertificateComponent', () => {
  let component: VaccinationCertificateComponent;
  let fixture: ComponentFixture<VaccinationCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationCertificateComponent]
    });
    fixture = TestBed.createComponent(VaccinationCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
