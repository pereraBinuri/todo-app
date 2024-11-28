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

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.crudService.getAllTodos()
      .pipe(
        tap((data: Todo[]) => {
          this.todos = data;
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

  editTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
    this.crudService.editTodo(updatedTodo).subscribe();
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.crudService.deleteTodo(todo).subscribe();
  }
}
