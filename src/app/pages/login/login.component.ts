import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  loginObj: any = {
    "username": "",
    "password": "",
  }

  loginError: string = '';
  onLogin() {
    this.loginService.login(this.loginObj.username, this.loginObj.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
         // Store the token from the response in localStorage
         this.loginService.setAuthToken(response.token);
        // Handle successful login, e.g., navigate to another page or store tokens
        alert('Login successful!');
        // Navigate to the AllComponent after a successful login
        this.router.navigate(['/all']);  // Assuming the route for AllComponent is '/all'
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.loginError = 'Invalid login credentials';
        // Show error alert
        alert('Invalid login credentials. Please try again.');
      }
    });
  }


}
