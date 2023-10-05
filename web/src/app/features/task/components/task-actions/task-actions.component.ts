import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Task } from "../../models/task.model";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "../../../../shared/components/form-dialog/form-dialog.component";
import { TaskResourceService } from "../../services/task-resource.service";
import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";

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

	constructor(
		public dialog: MatDialog,
		private taskResourceService: TaskResourceService,
	) {}

	openDialog() {
		this.dialog.open(FormDialogComponent, {
			data: this.task,
			minHeight: "600px",
			minWidth: "6 fw00px",
		});
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
			this.taskResourceService.delete(this.task.id).subscribe(() => {});
			this.taskDeleted.emit(this.task);
		} else {
			console.error("Task couldn't deleted.");
			// Set error notification, after implementing notification service
		}
	}
}
