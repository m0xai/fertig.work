import { Component, Input } from '@angular/core';
import { TodoModel } from '../../models/todo';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent {
  @Input() todoList: Array<TodoModel> = [];
  showFiller = false;
}
