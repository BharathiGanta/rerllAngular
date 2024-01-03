import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-vaccine',
  templateUrl: './available-vaccine.component.html',
  styleUrls: ['./available-vaccine.component.css']
})
export class AvailableVaccineComponent implements OnInit {
  vaccines: any[] = [];
  searchText: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchVaccines();
  }

  fetchVaccines(): void {
    this.httpClient.get<any[]>('http://localhost:3000/vaccine-posted')
      .subscribe(
        (response) => {
          this.vaccines = response;
        },
        (error) => {
          console.error('Error fetching vaccines:', error);
        }
      );
  }

  trackById(index: number, item: any): string {
    return item._id;
  }

  filteredVaccines(): any[] {
    return this.vaccines.filter(vaccine =>
      vaccine.placeOfVaccination.toLowerCase().includes(this.searchText.toLowerCase()) ||
      vaccine.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}