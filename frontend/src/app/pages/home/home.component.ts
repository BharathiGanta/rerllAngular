import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sliderImages: string[] = [
    'https://healthsciences.arizona.edu/sites/default/files/vaccine_graphic-hero_2400x1350_final-v2_0.jpg',
    'https://media.slidesgo.com/storage/22644571/responsive-images/6-national-immunization-awareness-month___media_library_original_1600_900.jpg',
    'https://phelpshealth.org/sites/default/files/inline-images/mrna%20jpg%20(1).JPG',
    'https://onlinepublichealth.gwu.edu/wp-content/uploads/sites/47/2021/07/how-vaccines-are-developed-.png?resize=1440',
    'https://media.slidesgo.com/storage/2551823/responsive-images/15-the-immune-system-breakthrough___media_library_original_1338_752.jpg',
    'https://www.aamc.org/sites/default/files/styles/scale_and_crop_1200_x_666/public/covid-vaccine-syringe-1297565599.jpg?itok=Zg_MrfJq',
  ];

  activeIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.sliderImages.length;
    }, 6000);
  }


 

}
