import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/userservicefiles/userprofile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  user: any = {
    email: '',
    username: '',
    dob: '',
    phoneNumber: '',
    address: '',
    gender: ''
  };

  isEditing = false;
  originalUser: any;

  constructor(private userService: UserProfileService) { }

  ngOnInit(): void {
    // Fetch email from local storage
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      this.user.email = loggedInUser.email;

      // Fetch user profile data
      this.userService.getUserProfile(this.user.email).subscribe(
        (response) => {
          this.user = { ...this.user, ...response };
          this.originalUser = { ...this.user }; // Save a copy for canceling edits
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  onFieldChange(): void {
    // Implement any necessary logic here
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    // Store a copy of the original user details if needed for cancellation
    if (this.isEditing) {
      this.originalUser = { ...this.user };
    }
  }



saveChanges(): void {
  // Check if user object is not null or undefined before updating
  if (this.user) {
    this.userService.updateUserProfile(this.user).subscribe(
      (response) => {
        console.log('User profile updated successfully:', response);

        // Update the local user object with the response
        this.user = response;

        // Update the originalUser to match the updated user
        this.originalUser = { ...this.user };

        // Exit editing mode
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
}


}