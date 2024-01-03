import { Component } from '@angular/core';
import { UpdateVaccineService } from '../../Adminservicefiles/updatevaccine.service'; // Update the path

@Component({
  selector: 'app-updatevaccines',
  templateUrl: './updatevaccines.component.html',
  styleUrls: ['./updatevaccines.component.css']
})
export class UpdatevaccinesComponent {
  vaccineName: string = '';
  startDate: string = '';
  endDate: string = '';
  vaccinationPlace: string = '';
  error: string = '';

  constructor(private updateVaccineService: UpdateVaccineService) { }

  handleAddVaccine(): void {
    try {
      if (!this.vaccineName || !this.startDate || !this.endDate || !this.vaccinationPlace) {
        this.error = 'Please fill all the fields.';
        return;
      }

      this.error = '';

      this.updateVaccineService.addVaccine({
        name: this.vaccineName,
        startDate: this.startDate,
        endDate: this.endDate,
        placeOfVaccination: this.vaccinationPlace
      }).subscribe((response: any) => {
        alert(response.message);

        const newVaccine = {
          name: this.vaccineName,
          startDate: this.startDate,
          endDate: this.endDate,
          placeOfVaccination: this.vaccinationPlace
        };


        this.onVaccineAdded(newVaccine);

        this.vaccineName = '';
        this.startDate = '';
        this.endDate = '';
        this.vaccinationPlace = '';
      });
    } catch (error) {
      console.error('Error adding vaccine:', error);
    }
  }

  onVaccineAdded(newVaccine: any): void {

  }
}
