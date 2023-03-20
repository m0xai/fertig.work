import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@NgModule({
  declarations: [TodosComponent, TodoDetailComponent],
  imports: [CommonModule],
  exports: [TodosComponent],
})
export class TodosModule {}
