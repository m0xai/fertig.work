import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  constructor(private service: TodoService) {}

  public todos: Todo[] = [];

  ngOnInit(): void {
    this.service.getTodos().subscribe((data: Todo[]) => {
      data.forEach((todo: Todo) => this.todos.push(todo));
      console.log(this.todos);
    });
  }
}
