import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-vaccination-certificate',
  templateUrl: './vaccination-certificate.component.html',
  styleUrls: ['./vaccination-certificate.component.css']
})
export class VaccinationCertificateComponent implements OnInit {
  name: string | undefined;
  vaccineName: string | undefined;
  age: number | undefined;
  date: string | undefined;
  time: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.vaccineName = params['vaccineName'];
      this.age = params['age'];
      this.date = params['date'];
      this.time = params['time'];
    });
  }






  downloadCertificate() {
    const container = document.getElementById('certificate');

    if (container) {
      Promise.resolve().then(() => {
        return html2canvas(container);
      }).then((canvas) => {
        const imageDataUrl = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = imageDataUrl;
        a.download = 'vaccination_certificate.png';
        a.click();

        document.body.removeChild(a);
      }).catch((error) => {
        console.error('Error generating certificate:', error);
      });
    } else {
      console.error('Element with ID "certificate" not found.');
    }
  }


  private generateCertificateHTML(): string {
    return `
      <div id="certificate" class="container pm-certificate-container">
        <div class="outer-border"></div>
        <div class="inner-border"></div>
        <div class="pm-certificate-border">
          <div class="row pm-certificate-header">
            <div class="pm-certificate-title cursive text-center">
              <h2>Certificate of Vaccination</h2>
            </div>
          </div>
          <div class="row pm-certificate-body">
            <div class="pm-certificate-block">
              <div class="pm-certificate-name underline margin-0 text-center">
                <span class="pm-name-text bold">{{ name }}</span>
              </div>
              <div class="pm-earned text-center">
                <span class="pm-earned-text padding-0 block cursive">
                  has received vaccination for
                </span>
                <span class="pm-credits-text block bold sans">
                  {{ vaccineName }}
                </span>
              </div>
              <div class="pm-course-title col-xs-8 text-center">
                <span class="pm-earned-text block cursive">
                  administered under the supervision of skilled medical
                  professionals
                </span>
              </div>
              <div class="pm-course-title underline col-xs-8 text-center">
                <span class="pm-credits-text block bold sans">
                </span>
              </div>
            </div>
            <div class="pm-certificate-footer">
              <div class="pm-certified text-center">
                <span class="pm-credits-text bold block sans">
                  Vaccinated By
                </span>
                <span class="pm-empty-space block underline"></span>
                <span class="pm-credits-text block sans">
                  SAVE LIVES
                </span>
              </div>
              <div class="pm-certified text-center">
                <span class="pm-credits-text bold block sans">
                  Date Completed
                </span>
                <span class="pm-empty-space block underline"></span>
                <span class="pm-credits-text block sans">
                  {{ date + ' ' + time }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  goToHistory() {
    this.router.navigate(['/vaccinehistory']);
  }
}