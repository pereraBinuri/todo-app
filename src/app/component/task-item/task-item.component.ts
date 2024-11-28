import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() todos: Todo[] = [];
  @Output() statusChange = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  onStatusChange(todo: Todo) {
    this.statusChange.emit(todo);
  }

  onEdit(todo: Todo) {
    this.edit.emit(todo);
  }

  onDelete(todo: Todo) {
    this.delete.emit(todo);
  }
}
