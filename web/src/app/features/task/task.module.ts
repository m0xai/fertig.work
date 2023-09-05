import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { MatDialogModule } from "@angular/material/dialog";
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TaskListOverviewComponent } from "./components/task-list-overview/task-list-overview.component";
import { TaskListDetailComponent } from "./components/task-list-detail/task-list-detail.component";
import { TaskCreateComponent } from "./components/task-create/task-create.component";

@NgModule({
    declarations: [TasksComponent, TaskDetailComponent, TaskEditComponent, TasksTableComponent, TaskListOverviewComponent, TaskListDetailComponent, TaskCreateComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
    ],
    exports: [TasksComponent, TaskDetailComponent, TaskEditComponent, TasksTableComponent],
})
export class TaskModule {
}
