import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(public router:Router){}

  authenticate(username: string, password: string): boolean {
    // Hardcoded username and password for demo purposes
    if (username === 'test' && password === 'test') {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  login() {
    // Your login logic goes here
    this.isAuthenticated = true;
  }


  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
  
}
