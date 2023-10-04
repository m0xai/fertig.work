import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksComponent } from "./components/tasks/tasks.component";
import { TaskDetailComponent } from "./components/task-detail/task-detail.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedTaskModule } from "../../shared/modules/shared-task/shared-task.module";

@NgModule({
	// The imports and exports of this module's component can be found in shared-task modules
	declarations: [TasksComponent, TaskDetailComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MatSidenavModule,
		MatButtonModule,
		MatDividerModule,
		MatInputModule,
		MatSelectModule,
		MatListModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		SharedTaskModule,
	],
	exports: [TasksComponent, TaskDetailComponent],
})
export class TaskModule {}
