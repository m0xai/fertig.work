import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TaskResourceService } from "../../services/task-resource.service";
import { ETaskPriority, ETaskStatus, Task } from "../../models/task.model";

@Component({
	selector: "app-task-create",
	templateUrl: "./task-create.component.html",
	styleUrls: ["./task-create.component.css"],
})
export class TaskCreateComponent {
	@Input({ required: true }) taskListId?: number;
	@Output() taskAdded = new EventEmitter<Task>();
	newTaskNameInput = "";

	constructor(private taskResourceService: TaskResourceService) {}

	addTaskToList() {
		this.createTaskFromInput(this.newTaskNameInput);
	}

	createTaskFromInput(input: string) {
		if (input && this.taskListId) {
			const newTask = Task.create()
				.withName(input)
				.withPriority(ETaskPriority.NORMAL)
				.withStatus(ETaskStatus.OPEN)
				.withTaskList(this.taskListId)
				.build();
			this.taskResourceService.create(newTask).subscribe(
				(value) => {
					this.taskAdded.emit(value); // Notify parent(task-list-detail) about newly created task
					this.newTaskNameInput = "";
				},
				(error) => {
					console.warn("Error oldu su an", error);
				},
			);
		}
	}
}
