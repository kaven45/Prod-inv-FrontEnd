import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Set the login status to true
  login() {
    this.isLoggedIn = true;
  }

  // Logout the user and set status to false
  logout() {
    this.isLoggedIn = false;
  }
}
