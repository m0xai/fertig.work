import { Component, Input, OnInit } from "@angular/core";
import { TaskList } from "../../models/task-list.model";
import { TaskResourceService } from "../../../task/services/task-resource.service";
import { Task } from "src/app/features/task/models/task.model";
import {
	NotificationService,
	NotificationType,
} from "../../../../shared/services/notification/notification.service";

@Component({
	selector: "app-task-list-detail",
	templateUrl: "./task-list-detail.component.html",
	styleUrls: ["./task-list-detail.component.css"],
})
export class TaskListDetailComponent implements OnInit {
	@Input({ required: true }) taskList: TaskList | undefined;
	public searchInTaskList = "";

	tasksOfList: Task[] = [];

	constructor(
		private taskResourceService: TaskResourceService,
		private notificationService: NotificationService,
	) {}

	getTasksByList() {
		this.taskResourceService.getTasksByList(this.taskList?.id).subscribe({
			next: (items) => {
				this.tasksOfList = items;
			},
			error: (e) => {
				this.notificationService.notify(
					"Cannot fetch task of list with ID: " +
						this.taskList?.id +
						". Error: " +
						e.error.detail,
					NotificationType.error,
				);
			},
		});
	}

	ngOnInit(): void {
		this.getTasksByList();
	}

	onTaskDeleted(task: Task) {
		this.tasksOfList = this.tasksOfList.filter((t) => t.id != task.id);
	}

	onTaskAdded(task: Task) {
		this.tasksOfList = [...this.tasksOfList, task];
	}

	handleTaskUpdated(updatedTask: Task) {
		const updatedTaskIdInList = this.tasksOfList.findIndex((item) => item.id == updatedTask.id);
		if (updatedTaskIdInList > -1) {
			// TODO: do some search this may not be the optimal way to update task list
			const tmp = [...this.tasksOfList];
			tmp[updatedTaskIdInList] = updatedTask;
			this.tasksOfList = tmp;
		} else {
			this.notificationService.notify(
				"An error occurred while updating task in view.",
				NotificationType.error,
			);
		}
	}
}
