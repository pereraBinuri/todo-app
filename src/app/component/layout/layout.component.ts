import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isOpen = false;  // Flag to control sidebar visibility

  // Function to toggle the sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
