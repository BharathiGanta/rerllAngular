import { Component, OnInit } from '@angular/core';
import { PostedVaccineService } from '../../Adminservicefiles/postedvaccine.service';

@Component({
  selector: 'app-postedvaccines',
  templateUrl: './postedvaccines.component.html',
  styleUrls: ['./postedvaccines.component.css']
})
export class PostedvaccinesComponent implements OnInit {
  vaccines: any[] = [];

  constructor(private vaccineService: PostedVaccineService) {}

  ngOnInit() {
    this.fetchVaccines();
  }

  fetchVaccines() {
    this.vaccineService.getPostedVaccines().subscribe(
      (response) => {
        this.vaccines = response;
      },
      (error) => {
        console.error('Error fetching vaccines:', error);
      }
    );
  }

  handleDelete(vaccineId: string) {
    this.vaccineService.deleteVaccine(vaccineId).subscribe(
      () => {
        this.vaccines = this.vaccines.filter((vaccine) => vaccine._id !== vaccineId);
      },
      (error) => {
        console.error('Error deleting vaccine:', error);
      }
    );
  }
}