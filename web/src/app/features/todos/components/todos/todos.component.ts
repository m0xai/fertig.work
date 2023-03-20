import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  todos: TodoModel[] = [];

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.fetch().subscribe((todos: TodoModel[]) => {
      this.todos = [...todos];
    });
  }
}
