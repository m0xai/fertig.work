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

export interface DialogData {
	animal: "panda" | "unicorn" | "lion";
}

@Component({
	selector: "app-task-actions",
	templateUrl: "./task-actions.component.html",
	styleUrls: ["./task-actions.component.css"],
})
export class TaskActionsComponent {
	@Input({ required: true }) task?: Task;
	@Output() taskDeleted = new EventEmitter<Task>();
	@Output() taskUpdated = new EventEmitter();

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
		// Close dialog button in the dialog clicked
		dialogRef.componentInstance.closeDialogOutput.subscribe(() => {
			dialogRef.close();
		});
		dialogRef.componentInstance.taskFieldUpdated.subscribe((updatedPart) =>
			this.partialUpdateTask(updatedPart),
		);
		dialogRef.afterClosed().subscribe(() => {
			dialogRef.componentInstance.closeDialogOutput.unsubscribe();
			dialogRef.componentInstance.taskFieldUpdated.unsubscribe();
		});
	}

	partialUpdateTask(inputTask: Task) {
		// TODO:  Emit task update in task-list-detail
		const taskToUpdate = new Task(inputTask);
		if (taskToUpdate.getId()) {
			this.taskResourceService.partialUpdate(taskToUpdate).subscribe(
				(resp) => {
					this.taskUpdated.emit(resp);
				},
				(error) =>
					this.notificationService.showNotification(
						"An error occurred while updaing task: " + error,
						NotificationType.error,
					),
			);
		} else {
			this.notificationService.showNotification(
				"Task couldn't updated, caused by invalid request",
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
