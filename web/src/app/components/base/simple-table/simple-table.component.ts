import { Component } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent {

  async getTodos() {
    const todos = await fetch("http://localhost:8080/todos/")
    return await todos.json();
  }
}
