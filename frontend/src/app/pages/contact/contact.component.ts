import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit {
  sliderImages: string[] = [
    'https://ors.od.nih.gov/mab/COVID19%20Resources%20Images/OCPL_GetVacNIH_digital_1EN.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1571623096/display_1500/stock-vector-people-vaccination-concept-for-immunity-health-doctor-makes-an-injection-of-flu-vaccine-to-a-man-1571623096.jpg',
    'https://childrenshealthdefense.org/wp-content/uploads/Covid-vaccine-VAERS-010722-feature.jpg',
    'https://www.shutterstock.com/shutterstock/photos/1968337342/display_1500/stock-vector-vaccination-badge-with-quote-i-got-covid-vaccine-for-vaccinated-persons-coronavirus-corona-1968337342.jpg',
  ];

  activeIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.sliderImages.length;
    }, 7000);
  }
}