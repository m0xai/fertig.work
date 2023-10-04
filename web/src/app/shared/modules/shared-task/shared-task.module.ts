import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TasksTableComponent } from "../../../features/task/components/tasks-table/tasks-table.component";
import { TaskCreateComponent } from "../../../features/task/components/task-create/task-create.component";
import { TaskListOverviewComponent } from "../../../features/task-list/componenets/task-list-overview/task-list-overview.component";
import { MatTableModule } from "@angular/material/table";
import { TaskActionsComponent } from "../../../features/task/components/task-actions/task-actions.component";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { TaskListDetailComponent } from "../../../features/task-list/componenets/task-list-detail/task-list-detail.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatIconModule,
		MatInputModule,
		FormsModule,
		MatListModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSortModule,
	],
	declarations: [
		TasksTableComponent,
		TaskCreateComponent,
		TaskActionsComponent,
		TaskListOverviewComponent,
		TaskListDetailComponent,
	],
	exports: [
		TasksTableComponent,
		TaskCreateComponent,
		TaskActionsComponent,
		TaskListOverviewComponent,
		TaskListDetailComponent,
	],
})
export class SharedTaskModule {}
