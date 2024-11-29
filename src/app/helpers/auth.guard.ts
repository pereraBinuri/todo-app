import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);  // Inject the LoginService

  // Check if the user is logged in (i.e., token exists in localStorage)
  if (loginService.isLoggedIn()) {
    return true;  // Allow route activation
  } else {
    // If not logged in, redirect to login page (you can adjust this as needed)
    window.location.href = '/login';  // You can also use the router to navigate if you prefer
    return false;
  }
};
