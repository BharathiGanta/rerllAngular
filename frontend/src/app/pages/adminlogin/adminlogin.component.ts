import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  username: string = '';
  password: string = '';
  captchaValue: string = '';
  userCaptcha: string = '';
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.captchaValue = captcha;
  }

  handleLoginSubmit(form: NgForm): void {
    const predefinedUsername = 'OnlineVaccine';
    const predefinedPassword = '12345';

    if (
      this.username.trim() === predefinedUsername &&
      this.password === predefinedPassword &&
      this.userCaptcha.toLowerCase() === this.captchaValue.toLowerCase()
    ) { localStorage.setItem('isNavbarVisible', 'false');
      this.router.navigate(['/dashboard']);
    } else {
      alert(`Invalid credentials or captcha. Please try again.`);
    }

    this.generateCaptcha();
    form.resetForm();
  }
}