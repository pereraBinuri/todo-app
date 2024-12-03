import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  // If the user is logged in, redirect them to the 'all' page
  if (loginService.isLoggedIn()) {
    window.location.href = '/all'; // Redirect to a default route for authenticated users
    return false;
  }
  return true; // Allow access to the login page if not logged in
};
