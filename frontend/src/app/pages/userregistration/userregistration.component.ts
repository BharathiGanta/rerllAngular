import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration.service';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent {
  userData = {
    username: '',
    email: '',
    password: '',
    securityQuestion1: '',
    securityAnswer1: '',
    securityQuestion2: '',
    securityAnswer2: '',
  };

  registrationSuccess = false;

  securityQuestions: string[] = [
    'What is the name of your first pet?',
    'In which city were you born?',
    'What is your favorite movie?',
    'Who is your favorite teacher?',
    'What is your mother\'s maiden name?',
  ];

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectRandomSecurityQuestions();
  }

  private selectRandomSecurityQuestions() {
    const randomIndex1 = Math.floor(Math.random() * this.securityQuestions.length);
    let randomIndex2 = Math.floor(Math.random() * this.securityQuestions.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * this.securityQuestions.length);
    }


    this.userData.securityQuestion1 = this.securityQuestions[randomIndex1];
    this.userData.securityQuestion2 = this.securityQuestions[randomIndex2];
  }

  onSubmit() {
    this.registrationService.registerUser(this.userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful');
        this.registrationSuccess = true;
        this.router.navigate(['/userlogin']);
      },
      (error) => {
        console.error('Registration failed:', error);
        alert('user already exist');

      }
    );
  }

  redirectToAnotherPage() {
    this.router.navigate(['/userlogin']);
  }
}