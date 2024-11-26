import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Base URL for the tasks endpoint
  private serviceURL: string = "https://60a21a08745cd70017576014.mockapi.io/api/v1/todo";

  constructor(private http: HttpClient) {}

  // Add Task
  addTodo(todo: Todo): Observable<Todo> {
    console.log("Adding task:", todo); // Log task to verify it's correct
    return this.http.post<Todo>(this.serviceURL, todo);
  }

  // Get All Tasks
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.serviceURL);
  }

  // Delete Task
  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.serviceURL}/${todo.id}`);
  }

  // Edit Task
  editTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.serviceURL}/${todo.id}`, todo);
  }
}
