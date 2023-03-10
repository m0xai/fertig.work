import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [SingleTodoComponent, TodoComponent],
  imports: [CommonModule],
  providers: [TodoService],
  exports: [TodoComponent],
})
export class TodoModule {}
