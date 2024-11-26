import { Component } from '@angular/core';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private filterService: FilterService) {}

  isOpen = false;

  // Toggle the sidebar visibility
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }


  // This method will set the filter to 'completed' when the completed button is clicked
  onFilterCompleted() {
    this.filterService.setFilter('completed');
  }

  // Optionally, other filters
  onFilterPending() {
    this.filterService.setFilter('pending');
  }

  onFilterAll() {
    this.filterService.setFilter('all');
  }
}
