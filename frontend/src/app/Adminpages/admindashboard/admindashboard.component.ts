import { Component,OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Adminservicefiles/dashboard.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  slots: any[] = [];
  familySlots: any[] = [];
  editingSlotId: string | null = null;
  editingFamilySlotId: string | null = null;

  editedSlotDate: string = '';
  editedSlotTime: string = '';
  editedFamilySlotDate: string = '';
  editedFamilySlotTime: string = '';

  searchQuery: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchSlots();
    this.fetchFamilySlots();
  }

  private fetchSlots() {
    this.dashboardService.getSlots().subscribe(
      (data) => {
        this.slots = data;
      },
      (error) => {
        console.error('Error fetching slots:', error);
      }
    );
  }

  private fetchFamilySlots() {
    this.dashboardService.getFamilySlots().subscribe(
      (data) => {
        this.familySlots = data;
      },
      (error) => {
        console.error('Error fetching family slots:', error);
      }
    );
  }

  filterSlots(): any[] {
    if (!this.searchQuery) {
      return this.slots;
    }

    return this.slots.filter(
      (slot) =>
        slot.vaccineName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        slot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filterFamilySlots(): any[] {
    if (!this.searchQuery) {
      return this.familySlots;
    }

    return this.familySlots.filter(
      (familySlot) =>
        familySlot.vaccine.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        familySlot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  startEditingSlot(slotId: string, date: string, time: string) {
    this.editingSlotId = slotId;
    this.editedSlotDate = date;
    this.editedSlotTime = time;
  }

  saveEditedSlot(slotId: string) {
    this.dashboardService.rescheduleSlot(slotId, this.editedSlotDate, this.editedSlotTime).subscribe(
      () => {
        console.log('Slot rescheduled successfully');
        this.fetchSlots();
        this.editingSlotId = null;
      },
      (error) => {
        console.error('Error rescheduling slot:', error);
      }
    );
  }

  cancelEditingSlot() {
    this.editingSlotId = null;
  }

  startEditingFamilySlot(familySlotId: string, date: string, time: string) {
    this.editingFamilySlotId = familySlotId;
    this.editedFamilySlotDate = date;
    this.editedFamilySlotTime = time;
  }

  saveEditedFamilySlot(familySlotId: string) {
    this.dashboardService.rescheduleFamilySlot(familySlotId, this.editedFamilySlotDate, this.editedFamilySlotTime).subscribe(
      () => {
        console.log('Family slot rescheduled successfully');
        this.fetchFamilySlots();
        this.editingFamilySlotId = null;
      },
      (error) => {
        console.error('Error rescheduling family slot:', error);
      }
    );
  }

  cancelEditingFamilySlot() {
    this.editingFamilySlotId = null;
  }

  deleteSlot(slotId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this slot?');

    if (confirmDelete) {
      this.dashboardService.deleteSlot(slotId).subscribe(
        () => {
          console.log('Slot deleted successfully');
          this.fetchSlots();
        },
        (error) => {
          console.error('Error deleting slot:', error);
        }
      );
    }
  }

  deleteFamilySlot(familySlotId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this family slot?');

    if (confirmDelete) {
      this.dashboardService.deleteFamilySlot(familySlotId).subscribe(
        () => {
          console.log('Family slot deleted successfully');
          this.fetchFamilySlots();
        },
        (error) => {
          console.error('Error deleting family slot:', error);
        }
      );
    }
  }


  completeSlot(slotId: string) {
    this.dashboardService.completeSlot(slotId).subscribe(
      () => {
        console.log(`Regular slot ${slotId} completed.`);
        this.fetchSlots();
      },
      (error) => {
        console.error('Error completing regular slot:', error);
      }
    );
  }

  completeFamilySlot(familySlotId: string) {
    this.dashboardService.completeFamilySlot(familySlotId).subscribe(
      () => {
        console.log(`Family slot ${familySlotId} completed.`);
        this.fetchFamilySlots();
      },
      (error) => {
        console.error('Error completing family slot:', error);
      }
    );
  }

  search() {
    this.fetchSlots();
    this.fetchFamilySlots();
  }
}
