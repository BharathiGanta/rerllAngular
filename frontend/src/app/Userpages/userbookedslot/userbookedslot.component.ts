import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserBookedSlotService } from 'src/app/userservicefiles/UserBookedSlot.service';

@Component({
  selector: 'app-userbookedslot',
  templateUrl: './userbookedslot.component.html',
  styleUrls: ['./userbookedslot.component.css']
})
export class UserbookedslotComponent implements OnInit {
  bookedSlots: any[] = [];
  userEmail: string = '';
  editingSlotId: string | null = null;
  editedSlots: any[] = [];


  constructor(
    private userbookedslotService: UserBookedSlotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      this.userEmail = loggedInUser.email;

      this.userbookedslotService.getBookedSlots(this.userEmail).subscribe(
        (data: any) => {
          this.bookedSlots = data;
        },
        (error: any) => {
          console.error('Error fetching booked slots:', error);
        }
      );
    } else {
      this.router.navigate(['/userlogin']);
    }
  }

  handleReschedule(slotId: string): void {
    this.editingSlotId = slotId;
    this.editedSlots = this.bookedSlots.map((slot) => ({ ...slot }));
  }

  handleSaveReschedule(slotId: string): void {
    const editedSlot = this.editedSlots.find((slot) => slot._id === slotId);

    if (!editedSlot) {
      console.error('Edited slot not found');
      return;
    }

    const { date, time } = editedSlot;

    this.userbookedslotService.rescheduleuserbookedslot(slotId, { date, time }).subscribe(
      () => {
        this.bookedSlots = this.bookedSlots.map((slot) => (slot._id === slotId ? editedSlot : slot));
        this.editingSlotId = null;
        this.editedSlots = [];
      },
      (error: any) => {
        if (error.status === 404) {
          console.error('Slot not found. It may have been deleted.');
        } else {
          console.error('Error rescheduling user booked slot:', error);
        }
      }
    );
  }

  handleCancelReschedule(slotId: string): void {
    this.editingSlotId = null;
    this.editedSlots = [];
  }

  handleDelete(slotId: string): void {
    this.userbookedslotService.deleteBookedSlot(slotId).subscribe(
      () => {
        this.bookedSlots = this.bookedSlots.filter(
          (slot) => slot._id !== slotId
        );
      },
      (error: any) => {
        console.error('Error deleting booked slot:', error);
      }
    );
  }
}