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
			this.heapTask = dialogRef.componentInstance.task; // Set heap task from the value of loaded task into dialog
		});
		// Close dialog button in the dialog clicked
		dialogRef.componentInstance.closeDialogOutput.subscribe(() => {
			dialogRef.close();
		});
		dialogRef.componentInstance.taskFieldUpdated.subscribe((updatedPart: TaskDTO) => {
			this.heapTask = updatedPart.toEntity();
		});
		dialogRef.afterClosed().subscribe((result) => {
			this.partialUpdateTask(this.heapTask); // Send PATCH requiest to backend
			this.taskUpdated.emit(this.heapTask); // Send heapTask to update grandparent TaskListDetail component
			dialogRef.componentInstance.closeDialogOutput.unsubscribe();
			dialogRef.componentInstance.taskFieldUpdated.unsubscribe();
		});
	}

	partialUpdateTask(inputTask: Task) {
		// TODO:  Emit task update in task-list-detail
		if (!Task.isEqual(inputTask, this.heapTask)) {
			debugger;
			this.taskResourceService.partialUpdate(inputTask).subscribe(() => {});
		} else {
			this.notificationService.showNotification(
				"Task changes couldn't be saved, the task object is not present.",
				NotificationType.error,
			);
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
		this.notificationService.showNotification(
			"Task successfully deleted.",
			NotificationType.success,
		);
		this.taskDeleted.emit(this.task);
	}

	deleteTaskError(error: any) {
		this.notificationService.showNotification(
			"An error occurred while deleting a task: ",
			error,
		);
	}
}
