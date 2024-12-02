import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://user-dev.delivergate.com/api/v1/webshop_customer/login';


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: 4,
      client_secret: 'wi1ciuewRqbIHgoEQMizPUyx0dYnBknDnojLWXGa',
      account_brand: 1,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-tenant-code': 'subway'
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  // Store token after successful login
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);  // Store token in localStorage
  }

   // Retrieve token
   getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove token during logout
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is logged in by checking token existence
  isLoggedIn(): boolean {
    return this.getAuthToken() !== null;
  }
}
