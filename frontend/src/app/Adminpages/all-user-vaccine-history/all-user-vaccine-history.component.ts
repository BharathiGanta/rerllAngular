import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/Adminservicefiles/Vaccinehistory.service';

@Component({
  selector: 'app-all-user-vaccine-history',
  templateUrl: './all-user-vaccine-history.component.html',
  styleUrls: ['./all-user-vaccine-history.component.css']
})
export class AllUserVaccineHistoryComponent implements OnInit {
  vaccinatedDetails: any[] = [];
  searchText: string = '';
  

  constructor(private vaccineService: VaccineService) {}

  ngOnInit(): void {
    this.fetchVaccinatedDetails();
  }

  fetchVaccinatedDetails(): void {
    this.vaccineService.getVaccinatedDetails().subscribe(
      (details) => {
        this.vaccinatedDetails = details;
      },
      (error) => {
        console.error('Error fetching vaccinated details', error);
      }
    );
  }

  trackById(index: number, item: any): string {
    return item._id;
  }

  filteredVaccinatedDetails(): any[] {
    return this.vaccinatedDetails.filter(detail =>
      detail.userEmail.toLowerCase().includes(this.searchText.toLowerCase()) ||
      detail.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      detail.vaccineName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}