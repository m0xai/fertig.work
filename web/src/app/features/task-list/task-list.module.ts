import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListOverviewComponent } from "./components/task-list-overview/task-list-overview.component";


@NgModule({
  declarations: [
    TaskListComponent,
    TaskListOverviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    TaskListComponent,
    TaskListOverviewComponent
  ],
})
export class TaskListModule {
}
