import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [TodosComponent, TodoDetailComponent],
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  exports: [TodosComponent],
})
export class TodosModule {}
