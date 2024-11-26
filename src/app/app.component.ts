// app.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  searchQuery: string = ''; // Property to store the search query
  isOpen = false; // Boolean to track sidebar open/close state

  @Output() searchQueryChange = new EventEmitter<string>(); // Emit search query changes

  // Method to toggle the sidebar
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
