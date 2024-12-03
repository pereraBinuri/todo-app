import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strictEmailValidator } from '../../helpers/validators/strict-email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup; // Reactive form group
  loginError: string = '';
  submitted: boolean = false; // Tracks if form is submitted

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    // Define the structure of the reactive form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, strictEmailValidator]], // Validators for email
      password: ['', [Validators.required, Validators.minLength(6)]], // Validators for password
    });
  }

  onLogin() {

    this.submitted = true; // Mark form as submitted

    if (this.loginForm.invalid) {
      // If the form is invalid, do not proceed and show errors
      this.loginError = 'Please correct the errors in the form before submitting.';
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    this.loginService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        const accessToken = response.accessToken; // Assuming accessToken in the response
        this.loginService.setAuthToken(accessToken);
        this.router.navigate(['/all']); // Navigate to another route on success
      },
      error: (error) => {
        console.error('Login failed:', error);
  
        // Set an error message for invalid credentials
        this.loginError = 'Invalid username or password. Please try again.';
      }
    });
  }
  

}
