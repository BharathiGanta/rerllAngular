import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyMembersBookingService } from 'src/app/userservicefiles/familymembersbooking.service';
import { UpdateVaccineService } from 'src/app/Adminservicefiles/updatevaccine.service';

@Component({
  selector: 'app-familymembersbooking',
  templateUrl: './familymembersbooking.component.html',
  styleUrls: ['./familymembersbooking.component.css']
})
export class FamilyMembersBookingComponent {
  familyMembers: any[] = [];
  userEmail: string = '';
  vaccines: any[] = [];
  editedSlots: any[] = [];      
  bookedSlots: any[] = [];
  availableVaccines: string[] = [];

  constructor(
    private familyMembersBookingService: FamilyMembersBookingService,
    private updateVaccineService: UpdateVaccineService,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      this.userEmail = loggedInUser.email;
    }
    this.addMember();
  }

  ngOnInit(): void {
    this.loadVaccines();
  }

  loadVaccines(): void {
    this.familyMembersBookingService.getVaccines().subscribe(
      (vaccines) => {
        this.vaccines = vaccines;
      },
      (error) => {
        console.error('Failed to load vaccines:', error);
      }
    );
  }

  enterEditMode(slotIndex: number): void {
    this.editedSlots[slotIndex] = { ...this.bookedSlots[slotIndex] };

    this.updateVaccineService.getAvailableVaccines().subscribe(
      (vaccines: string[]) => {
        this.availableVaccines = vaccines;
        const originalVaccine = this.bookedSlots[slotIndex].vaccine;
        this.editedSlots[slotIndex].vaccine = originalVaccine;
      },
      (error: any) => {
        console.error('Error fetching available vaccines:', error);
      }
    );
  }

  addMember() {
    const newMember = {
      id: this.generateUniqueId(),
      userEmail: this.userEmail,
      name: '',
      age: '',
      vaccine: '',
      date: '',
      time: ''
    };
    this.familyMembers.push(newMember);
  }

  deleteMember(index: number) {
    this.familyMembers.splice(index, 1);
  }

  validateFormData(): boolean {
    // Check each field for emptiness
    for (const member of this.familyMembers) {
      if (!member.vaccine || !member.name || !member.age || !member.date || !member.time) {
        // Display a message or handle invalid form
        console.log('Form is invalid. Please fill in all required fields.');
        alert('Please fill in all required fields')
        return false;
      }
    }
    return true;
  }

  bookSlot() {
    // Validate the form data before attempting to book
    if (this.validateFormData()) {
      this.familyMembersBookingService.bookSlot(this.familyMembers).subscribe(  //handling asynchronous response 
        () => {
          console.log('Slots booked successfully');
          alert('Slots booked successfully');
          this.router.navigate(['/familybookedslot']);
        },
        (error) => {
          if (error.status === 200) {
            console.log('Slots booked successfully');
            alert('Slots booked successfully');
            this.router.navigate(['/familybookedslot']);
          } else {
            console.error('Failed to book slots:', error);
          }
        }
      );
    }
  }

  generateUniqueId(): number {
    return Math.floor(Math.random() * 900000) + 100000;
  }
}