import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { CrudService } from '../../service/crud.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todoObj: Todo = new Todo();
  todoArr: Todo[] = [];
  addTodoValue: string = '';
  editTodoValue: string = '';
  filteredTodos: Todo[] = []; // Store filtered tasks
  filter: 'all' | 'completed' | 'pending' = 'all'; // Track filter status
  
  searchQuery: string = ''; // For search functionality
  
  constructor(private crudService: CrudService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.editTodoValue = '';
    this.addTodoValue = '';
    this.todoObj = new Todo();
    this.todoArr = [];
    this.getAllTodos();
    this.filterService.filter$.subscribe(filter => {
      this.filter = filter;
      this.applyFilter();
    });
  }

  // Subscribe to the searchQueryChange event and filter tasks
  onSearchQueryChange(query: string) {
    this.searchQuery = query;
    this.filterTasks(); // Reapply filter with the new search query
  }

  getAllTodos() {
    this.crudService.getAllTodos()
      .pipe(
        tap(res => {
          this.todoArr = res;
          this.applyFilter();
        }),
        catchError(err => {
          alert("Unable to get the list of tasks");
          return of([]); // Returning an empty array on error
        })
      )
      .subscribe();
  }

  applyFilter() {
    if (this.filter === 'completed') {
      this.filteredTodos = this.todoArr.filter(todo => todo.status === 'completed');
    } else if (this.filter === 'pending') {
      this.filteredTodos = this.todoArr.filter(todo => todo.status === 'pending');
    } else {
      this.filteredTodos = this.todoArr;
    }
    this.filterTasks(); // Reapply search filter after other filters
  }

  filterTasks() {
    if (this.searchQuery) {
      this.filteredTodos = this.filteredTodos.filter(todo => 
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

  addTodo() {
    if (!this.addTodoValue) {
      alert("Task name cannot be empty");
      return;
    }

    this.todoObj.title = this.addTodoValue;
    this.todoObj.description = "Description Here";
    this.todoObj.status = 'pending';

    if (!this.todoObj.dueDate) {
      alert("Due date and time are required");
      return;
    }

    this.crudService.addTodo(this.todoObj)
      .pipe(
        tap(() => {
          this.getAllTodos(); // Refresh the task list
          this.addTodoValue = ''; // Clear the input field
          this.todoObj.dueDate = ''; // Reset due date
        }),
        catchError(err => {
          alert("Failed to add task");
          return of(null); // Return null observable on error
        })
      )
      .subscribe();
  }

  editTodo() {
    this.todoObj.title = this.editTodoValue;
    this.crudService.editTodo(this.todoObj)
      .pipe(
        tap(() => this.getAllTodos()), // Refresh after edit
        catchError(err => {
          alert("Failed to update the todo");
          return of(null); // Return null observable on error
        })
      )
      .subscribe();
  }

  deleteTodo(etodo: Todo) {
    this.crudService.deleteTodo(etodo)
      .pipe(
        tap(() => this.getAllTodos()), // Refresh after delete
        catchError(err => {
          alert("Failed to delete todo");
          return of(null); // Return null observable on error
        })
      )
      .subscribe();
  }
  
  call(etodo : Todo){
    this.todoObj = etodo;
    this.editTodoValue = etodo.title;
    this.todoObj.dueDate = etodo.dueDate;
  }

  toggleStatus(todo: Todo) {
    // Toggle status
    todo.status = (todo.status === 'pending') ? 'completed' : 'pending';
    this.crudService.editTodo(todo)
      .pipe(
        tap(() => this.getAllTodos()), // Refresh the list after status update
        catchError(err => {
          alert("Failed to update task status");
          return of(null);
        })
      )
      .subscribe();
  }

  // This method will be called when the sidebar filter is clicked
  changeFilter(status: 'all' | 'completed' | 'pending') {
    this.filter = status;
    this.applyFilter(); // Apply filter when status changes
  }

}
