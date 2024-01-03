import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyBookedSlotService } from 'src/app/userservicefiles/familymembers.service';

@Component({
  selector: 'app-familybookedslot',
  templateUrl: './familybookedslot.component.html',
  styleUrls: ['./familybookedslot.component.css']
})
export class FamilybookedslotComponent implements OnInit {
  bookedSlots: any[] = [];
  editedSlots: any[] = [];
  userEmail: string = '';
  editingSlotId: string | null = null;

  constructor(
    private familyBookedSlotService: FamilyBookedSlotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      this.userEmail = loggedInUser.email;

      this.familyBookedSlotService.getFamilyBookedSlots(this.userEmail).subscribe(
        (data: any) => {
          this.bookedSlots = data;
        },
        (error: any) => {
          console.error('Error fetching family booked slots:', error);
        }
      );
    } else {
      this.router.navigate(['/userlogin']);
    }
  }

  handleReschedule(slotId: string): void {
    this.editingSlotId = slotId;
    const slotIndex = this.bookedSlots.findIndex(slot => slot.id === slotId);
    if (slotIndex !== -1) {
      this.editedSlots[slotIndex] = { ...this.bookedSlots[slotIndex] };
    }
  }

  enterEditMode(slotIndex: number): void {
    console.log('Entering edit mode...');

  }

  handleSaveReschedule(index: number): void {
    const editedSlot = this.editedSlots[index];


    this.familyBookedSlotService.updateFamilyBookedSlot(editedSlot).subscribe(
      () => {

        this.bookedSlots = this.bookedSlots.map(slot => (slot.id === editedSlot.id ? editedSlot : slot));
        this.editingSlotId = null;
        this.editedSlots = [];
      },
      (error: any) => {
        console.error('Error updating family booked slot:', error);
      }
    );
  }

  handleCancelReschedule(index: number): void {
    this.editingSlotId = null;
    this.editedSlots = [];
  }

  handleDelete(slotId: string): void {
    this.familyBookedSlotService.deleteFamilyBookedSlot(slotId).subscribe(
      () => {
        this.bookedSlots = this.bookedSlots.filter((slot) => slot.id !== slotId);
      },
      (error: any) => {
        console.error('Error deleting family booked slot:', error);
      }
    );
  }
}