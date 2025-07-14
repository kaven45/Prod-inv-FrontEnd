import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Error message for form validation
  formError: string | null = null;

  // User object with initial empty values
  user: any = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    mobileNumber: ''
  };

  private readonly registerApiUrl = 'http://localhost:8082/user/register';


  constructor(private router: Router, private http: HttpClient) {}

  // Form submission handler
  onSubmit(registerForm: any) {
    // Check if any field is empty
    if (
      !this.user.email ||
      !this.user.password ||
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.location ||
      !this.user.mobileNumber
    ) {
      this.formError = '⚠️ Please fill in all required fields correctly!';
      return;
    }

    // Validate email format (@gmail.com required)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(this.user.email)) {
      this.formError = '⚠️ Invalid email! Must contain @gmail.com';
      return;
    }

    // Validate password (min 6 characters, at least 1 uppercase)
    const passwordPattern = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(this.user.password)) {
      this.formError =
        '⚠️ Password must be at least 6 characters long and contain 1 uppercase letter!';
      return;
    }

    // Validate mobile number format (starts with 6-9 and exactly 10 digits)
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(this.user.mobileNumber)) {
      this.formError = '⚠️ Invalid mobile number! Must start with 6 and be 10 digits.';
      return;
    }

    this.http.post(this.registerApiUrl, this.user).subscribe({
      next: (response) => {
        console.log('✅ User registered successfully:', response);

        // Show success alert
        alert('🎉 Registration successful! You can now log in.');

        // Clear form after success
        this.formError = null;
        registerForm.resetForm();

        // Redirect to login after successful registration
        this.redirectToLogin();
      },
      error: (error) => {
        console.error('❌ Error during registration:', error);

        // Show error message
        this.formError = '❌ Registration failed! Please try again.';
      }
    });
  }



  // Redirect to login page after successful registration
  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
