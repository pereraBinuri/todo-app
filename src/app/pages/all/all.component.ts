import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { CrudService } from '../../service/crud.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  todos: Todo[] = [];
  todoObj: Todo = new Todo();
  addTodoValue: string = '';
  editTodoValue: string = '';  // Used for editing the task title
  editDueDate: string = ''; // Due date for editing
  filteredTodos: Todo[] = [];
  //selectedTodo: Todo | null = null; // Store the selected todo for editing

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.crudService.getAllTodos()
      .pipe(
        tap((data: Todo[]) => {
          this.todos = data;
          this.filteredTodos = data; // Initialize filteredTodos
        }),
        catchError(err => {
          alert("Failed to fetch todos");
          return of([]);
        })
      )
      .subscribe();
  }

  addTodo() {
    if (!this.addTodoValue || !this.todoObj.dueDate) {
      alert("Task name and due date cannot be empty");
      return;
    }

    this.todoObj.title = this.addTodoValue;
    this.todoObj.description = "Description Here";
    this.todoObj.status = 'pending';

    this.crudService.addTodo(this.todoObj)
      .pipe(
        tap((newTodo: Todo) => {
          this.todos.push(newTodo);
          this.addTodoValue = '';
          this.todoObj.dueDate = '';
        }),
        catchError(err => {
          alert("Failed to add task");
          return of(null);
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
    this.filteredTodos = this.todos.filter(todo =>
      todo.title.toLowerCase().includes(lowerCaseQuery)
    );
  }
}
