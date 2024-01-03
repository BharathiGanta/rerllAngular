// userresetpassword.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResetPasswordService } from '../../UserResetPassword.service';

interface User {
  email: string;
  securityAnswer1: string;
  securityAnswer2: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: string;
}

@Component({
  selector: 'app-userresetpassword',
  templateUrl: './userresetpassword.component.html',
  styleUrls: ['./userresetpassword.component.css']
})
export class UserresetpasswordComponent implements OnInit {
  user: User = {
    email: '',
    securityAnswer1: '',
    securityAnswer2: '',
    newPassword: '',
    confirmPassword: '',
  };

  validationErrors = {
    email: '',
    securityAnswer1: '',
    securityAnswer2: '',
    newPassword: '',
    confirmPassword: '',
  };

  securityQuestions: any = null;
  showPasswordFields = false;
  securityAnswerError = '';

  constructor(
    private UserResetPasswordService: UserResetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleChange(event: any): void {
    const { name, value } = event.target;
    this.user = {
      ...this.user,
      [name]: value,
    };

    this.validationErrors = {
      ...this.validationErrors,
      [name]: '',
    };
  }

  checkEmailAndProceed(): void {
    if (!this.user.email) {
      this.validationErrors = {
        ...this.validationErrors,
        email: 'Email is required',
      };
      return;
    }

    this.UserResetPasswordService.checkEmail(this.user.email).subscribe(
      (res: any) => {
        if (res.securityQuestions) {
          this.securityQuestions = res.securityQuestions;
        } else {
          this.validationErrors = {
            ...this.validationErrors,
            email: 'User not found',
          };
        }
      },
      (error) => {
        console.error('Error checking email:', error);
        this.validationErrors = {
          ...this.validationErrors,
          email: 'Error checking email',
        };
      }
    );
  }

  validateFields(): boolean {
    let isValid = true;
    const newValidationErrors: any = {};

    Object.keys(this.user).forEach((key) => {
      if (!this.user[key]) {
        newValidationErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      }
    });

    this.validationErrors = newValidationErrors;
    return isValid;
  }

  resetPassword(): void {
    if (!this.securityQuestions) {
      this.checkEmailAndProceed();
    } else {
      this.UserResetPasswordService
        .checkSecurityAnswers({
          email: this.user.email,
          securityAnswer1: this.user.securityAnswer1,
          securityAnswer2: this.user.securityAnswer2,
        })
        .subscribe(
          (res: any) => {
            console.log('Server Response:', res);
            this.showPasswordFields = true;
            this.securityAnswerError = '';
          },
          (error) => {
            console.error('Http error:', error);
            this.securityAnswerError =
              'Incorrect security answers. Please try again.';
          }
        );
    }
  }

  submitNewPassword(): void {
    if (this.validateFields()) {
      this.UserResetPasswordService.resetPassword(this.user).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['/userlogin']);
        },
        (error) => {
          if (error.status === 401) {
            this.securityAnswerError =
              'Incorrect security answers. Please try again.';
          }
          console.error('Http error:', error);
        }
      );
    }
  }
}
