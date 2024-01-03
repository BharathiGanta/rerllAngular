import { Component, OnInit } from '@angular/core';
import { UserVaccineHistoryService } from 'src/app/userservicefiles/Uservaccinehistory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uservaccinehistory',
  templateUrl: './uservaccinehistory.component.html',
  styleUrls: ['./uservaccinehistory.component.css']
})
export class UservaccinehistoryComponent implements OnInit {
  userVaccineHistoryWithId: any[] = [];
  userVaccineHistoryWithoutId: any[] = [];
  userEmail: any;
  selectedUser: any;

  constructor(private userVaccineHistoryService: UserVaccineHistoryService, private router: Router) {

  }

  ngOnInit(): void {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    const loggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;

    if (loggedInUser) {
      this.userEmail = loggedInUser.email;
      this.userVaccineHistoryService.getUserVaccinationHistory(this.userEmail).subscribe(
        (data) => {
          this.userVaccineHistoryWithId = data.filter((record) => record.id);
          this.userVaccineHistoryWithoutId = data.filter((record) => !record.id);
        },
        (error) => {
          console.error('Error fetching user vaccination history:', error);
        }
      );
    }
  }
  downloadCertificate(record: any) {

    this.router.navigate(['/certificate'], {
      queryParams: {
        name: record.name,
        vaccineName: record.vaccineName,
        age: record.age,
        date: record.date,
        time: record.time
      }
    });
  }
}