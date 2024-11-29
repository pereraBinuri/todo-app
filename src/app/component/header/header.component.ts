import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() sidebarToggle = new EventEmitter<void>();

    constructor(private router: Router, private loginService: LoginService) {}

    toggleSidebar() {
        this.sidebarToggle.emit();
    }

    logout() {
        this.loginService.logout();  // Call the logout method from LoginService
        this.router.navigate(['/login']);  // Redirect to login page after logout
    }
}
