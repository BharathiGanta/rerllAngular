import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/userlogin.service';
import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  
  userData = {
    email: '',
    password: '',
    captcha: ''
  };

  generatedCaptcha = '';
  showCaptcha = false;
  loginSuccess = false;
  

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {}

  onSubmit() {
    // Check if any field in userData is empty
    if (
      this.userData.email.trim() === '' ||
      this.userData.password.trim() === '' ||
      this.userData.captcha.trim() === ''
    ) {
      console.error('Please fill all the fields.');
      alert('Please fill all the fields.');
      return; // Stop execution if any field is empty
    }
  
    if (this.userData.captcha === this.generatedCaptcha) {
      this.userLoginService.loginUser(this.userData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          // alert('Login successful');
          this.loginSuccess = true;
  
          // Set user data to local storage
          localStorage.setItem('loggedInUser', JSON.stringify(this.userData));
  
          // Redirect to another page upon successful login
          this.router.navigate(['/available-vaccine']);
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Please fill correct details.');
        }
      );
    } else {
      console.error('Captcha validation failed');
    }
  }
  
  generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 6;
    this.generatedCaptcha = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    this.showCaptcha = true;
  }
}