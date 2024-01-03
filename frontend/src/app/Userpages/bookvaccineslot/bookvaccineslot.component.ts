import { Component, OnInit } from '@angular/core';
import { BookVaccineSlotService } from '../../userservicefiles/Bookvaccineslot.service';

@Component({
  selector: 'app-bookvaccineslot',
  templateUrl: './bookvaccineslot.component.html',
  styleUrls: ['./bookvaccineslot.component.css']
})
export class BookVaccineSlotComponent implements OnInit {
  formData = {
    vaccineName: '',
    name: '',
    age: '',
    date: '',
    time: ''
  };

  submitted = false;
  validationErrors: any = {};
  availableVaccines: string[] = [];
  userEmail = '';

  constructor(private bookVaccineSlotService: BookVaccineSlotService) { }

  ngOnInit() {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;

    if (loggedInUser) {
      this.userEmail = loggedInUser.email;
    }

    this.bookVaccineSlotService.getAvailableVaccines()
      .subscribe(
        (data: any) => {
          this.availableVaccines = data.map((vaccine: any) => vaccine.name);
        },
        error => {
          console.error('Error fetching vaccines:', error);
        }
      );
  }

  handleChange(event: any) {
    this.formData = { ...this.formData, [event.target.name]: event.target.value };
  }



  validateFormData(): boolean {
    const errors: any = {};

    if (!this.formData.vaccineName) {
      errors.vaccineName = 'Vaccine is required';
    }
    if (!this.formData.name) {
      errors.name = 'Name is required';
    }
    if (!this.formData.age) {
      errors.age = 'Age is required';
    }
    if (!this.formData.date) {
      errors.date = 'Date is required';
    }
    if (!this.formData.time) {
      errors.time = 'Time is required';
    }

    this.validationErrors = errors;
    return Object.keys(errors).length === 0;
  }


  handleSubmit() {
    if (!this.validateFormData()) {
      return;
    }

    const slotData = {
      userEmail: this.userEmail,
      vaccineName: this.formData.vaccineName,
      name: this.formData.name,
      age: this.formData.age,
      date: this.formData.date,
      time: this.formData.time
    };

    this.bookVaccineSlotService.bookSlot(slotData)
      .subscribe(
        () => {
          console.log('Slot booked successfully');
          this.formData = {
            vaccineName: '',
            name: '',
            age: '',
            date: '',
            time: ''
          };
          this.submitted = true;
        },
        (error: any) => {
          if (error.status === 400) {
            window.alert(error.error.message);
          } else {
            console.error('Failed to book slot');
          }
        }
      );
  }
}