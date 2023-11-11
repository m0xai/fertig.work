import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../models/task.model";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../../../../shared/components/form-dialog/form-dialog.component";
import { TaskResourceService } from "../../services/task-resource.service";
import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {
	NotificationService,
	NotificationType,
} from "../../../../shared/services/notification/notification.service";
import { TaskDTO } from "../../dtos/task-dto";

@Component({
	selector: "app-task-actions",
	templateUrl: "./task-actions.component.html",
	styleUrls: ["./task-actions.component.css"],
})
export class TaskActionsComponent {
	@Input({ required: true }) task?: Task;
	@Output() taskDeleted = new EventEmitter<Task>();
	@Output() taskUpdated = new EventEmitter<Task>();
	persistedTask: Task = new Task();
	heapTask = new Task();

	constructor(
		public dialog: MatDialog,
		public notificationService: NotificationService,
		private taskResourceService: TaskResourceService,
	) {}

	openDialog() {
		const dialogRef = this.dialog.open(FormDialogComponent, {
			data: this.task,
			minHeight: "600px",
			minWidth: "600px",
		});
		dialogRef.afterOpened().subscribe(() => {
			// Set persisted and heap tasks as input task, then change only heap task
			this.persistedTask = dialogRef.componentInstance.task;
			this.heapTask = dialogRef.componentInstance.task;
		});
		// Close dialog button in the dialog clicked
		dialogRef.componentInstance.closeDialogOutput.subscribe(() => {
			dialogRef.close();
		});
		dialogRef.componentInstance.taskFieldUpdated.subscribe((updatedPart: TaskDTO) => {
			this.heapTask = updatedPart.toEntity(); // Update heap task after each field change
		});
		dialogRef.afterClosed().subscribe(() => {
			this.partialUpdateTask(this.heapTask); // Send PATCH requiest to backend
			this.taskUpdated.emit(this.heapTask); // Send heapTask to update grandparent TaskListDetail component
			dialogRef.componentInstance.closeDialogOutput.unsubscribe();
			dialogRef.componentInstance.taskFieldUpdated.unsubscribe();
		});
	}

	partialUpdateTask(inputTask: Task) {
		if (!Task.isEqual(inputTask, this.persistedTask)) {
			this.taskResourceService.partialUpdate(inputTask).subscribe({
				next: () => {
					this.notificationService.notify(
						"Task has been updated successfully.",
						NotificationType.success,
					);
				},
				error: (e) => {
					this.notificationService.notify(
						"An error occurred, while trying to update task object: " + e.error.detail,
						NotificationType.error,
					);
				},
			});
		} else {
			// Task hasn't changed, no need to update anything
		}
	}

	confirmDeleteTask() {
		this.dialog
			.open(ConfirmDialogComponent, {
				autoFocus: "dialog",
				data: {
					itemType: "Task",
				},
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					this.deleteTask();
				}
			});
	}

	deleteTask() {
		if (this.task?.id) {
			this.taskResourceService.delete(this.task.id).subscribe(
				() => this.deleteTaskAction(),
				(error) => this.deleteTaskError(error),
			);
		}
	}

	deleteTaskAction() {
		this.notificationService.notify("Task successfully deleted.", NotificationType.success);
		this.taskDeleted.emit(this.task);
	}

	deleteTaskError(error: any) {
		this.notificationService.notify("An error occurred while deleting a task: ", error);
	}
}
