import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Task } from "../../models/task.model";
import { MatTableDataSource } from "@angular/material/table";
import { TaskResourceService } from "../../services/task-resource.service";
import { MatSort } from "@angular/material/sort";
import {
	NotificationService,
	NotificationType,
} from "../../../../shared/services/notification/notification.service";

@Component({
	selector: "app-tasks-table",
	templateUrl: "./tasks-table.component.html",
	styleUrls: ["./tasks-table.component.css"],
})
export class TasksTableComponent {
	displayedColumns: string[] = ["isDone", "name", "status", "priority", "actions"];
	dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
	@Output() taskDeleted = new EventEmitter<Task>();
	@Output() forwardUpdatedTask = new EventEmitter<Task>();
	@ViewChild(MatSort) private sort!: MatSort;

	constructor(
		private taskResourceService: TaskResourceService,
		private notificationService: NotificationService,
	) {}

	@Input({ required: true }) set searchText(value: string) {
		this.applySearch(value);
	}

	@Input({ required: true }) set tasks(value: Task[]) {
		// Note, changes may not fire setter: https://stackoverflow.com/a/34799257
		this.dataSource = new MatTableDataSource<Task>(value);
		this.dataSource.sort = this.sort;
	}

	@Output()
	applySearch(searchText: string) {
		this.dataSource.filter = searchText.trim().toLowerCase();
	}

	updateTaskStatus(element: Task) {
		this.taskResourceService.update(element).subscribe({
			next: (value) => {},
			error: (err) =>
				this.notificationService.notify(
					"Task with ID: " + element.id + " cannot updated. Error: " + err.error.detail,
					NotificationType.error,
				),
		});
	}

	onTaskDeleted(task: Task) {
		// Just a bridge between task-actions(child) and (task-list-detail(parent)
		this.taskDeleted.emit(task);
	}

	onTaskUpdate($event: Task) {
		// This just forwards updated task to parent (task-list-detail component
		this.forwardUpdatedTask.emit($event);
	}
}
