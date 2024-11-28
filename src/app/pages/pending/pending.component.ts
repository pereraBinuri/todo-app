import { Component } from '@angular/core';
import { Todo } from '../../model/todo';
import { CrudService } from '../../service/crud.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {

  todos: Todo[] = [];
  filteredPendingTodos: Todo[] = [];
  todoObj: Todo = new Todo();
  editTodoValue: string = ''; 

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.fetchPendingTodos();
  }

  fetchPendingTodos() {
    this.crudService.getAllTodos()
      .pipe(
        tap((data: Todo[]) => {
          this.todos = data;
          this.filteredPendingTodos = this.todos.filter(todo => todo.status === 'pending');
        }),
        catchError(err => {
          alert("Failed to fetch todos");
          return of([]);
        })
      )
      .subscribe();
  }

  toggleStatus(todo: Todo) {
    todo.status = todo.status === 'completed' ? 'pending' : 'completed';
    this.crudService.editTodo(todo).subscribe();
  }

  // Open the Edit Modal and populate the fields
  onEditTodo(todo: Todo) {
    this.editTodoValue = todo.title;
    this.todoObj.dueDate = todo.dueDate;
    this.todoObj.id = todo.id;  // Store the task ID for editing
  }

  // Edit the task after modal form submission
  editTodo() {
    if (!this.editTodoValue || !this.todoObj.dueDate) {
      alert("Task name and due date cannot be empty");
      return;
    }

    // Update the task with the new values
    const updatedTodo = { ...this.todoObj, title: this.editTodoValue };

    this.crudService.editTodo(updatedTodo).subscribe(
      (response) => {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      (error) => alert("Failed to update task")
    );
  }


  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.crudService.deleteTodo(todo).subscribe();
  }

  onSearch(query: string) {
    const lowerCaseQuery = query.toLowerCase().trim();
  
    if (!lowerCaseQuery) {
      // Reset to show only completed todos when the search bar is cleared
      this.filteredPendingTodos = this.todos.filter(todo => todo.status === 'pending');
    } else {
      // Filter todos based on the search query
      this.filteredPendingTodos = this.todos.filter(
        todo => todo.title.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }
}
