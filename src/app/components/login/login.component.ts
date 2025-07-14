import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  loginError: string | null = null;
  private loginApiUrl = 'http://localhost:8082/user/login';

  constructor(private router: Router, private http: HttpClient,  private authService: AuthService) {}

  onLogin(loginForm: any) {
    if (loginForm.invalid) {
      this.loginError = '❗ Please fill in all fields!';
      return;
    }

    // Call the backend login API
    this.http.post(this.loginApiUrl, this.loginData).subscribe({
      next: () => {
        this.authService.login();  //nav
        alert('✅ Login successful!');
        this.router.navigate(['/products']); // Redirect to products page
      },
      error: (error) => {
        console.error('❌ Login error:', error);
        this.loginError = '❗ Invalid email or password. Please try again!';
      },
    });
  }

  // Redirect to register page without validation
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
